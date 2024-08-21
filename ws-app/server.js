const ws = require('ws');
const { Kafka } = require('kafkajs');
const config = require('config');
const constants = require('./constants');
const { v4: uuidv4 } = require('uuid');

const wss = new ws.Server({ port: 8085 });

const kafka = new Kafka({
    clientId: 'ws-app',
    brokers: config.get('kafka.brokers')
});

const clients = new Map();
const messageBuffer = new Map();
const MESSAGE_TTL = 5 * 60 * 1000; // 5 minutes

wss.on('connection', async (ws) => {
    const id = uuidv4();
    clients.set(id, ws);

    ws.on('message', async (message) => {
        try {
            const { type, requestId } = JSON.parse(message);
            if (type === 'register' && requestId) {
                console.log(`Registering client with requestId: ${requestId}`);
                clients.set(requestId, ws);
                clients.delete(id);

                // Send any buffered messages
                const bufferedMessages = messageBuffer.get(requestId) || [];
                while (bufferedMessages.length > 0) {
                    const msg = bufferedMessages.shift();
                    ws.send(JSON.stringify(msg));
                }
                messageBuffer.delete(requestId);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        clients.delete(id);
    });
});

const bufferMessage = (requestId, message) => {
    if (!messageBuffer.has(requestId)) {
        messageBuffer.set(requestId, []);
    }
    messageBuffer.get(requestId).push(message);

    // Set a timeout to remove the message after TTL
    setTimeout(() => {
        const messages = messageBuffer.get(requestId);
        if (messages) {
            const index = messages.indexOf(message);
            if (index > -1) {
                messages.splice(index, 1);
            }
            if (messages.length === 0) {
                messageBuffer.delete(requestId);
            }
        }
    }, MESSAGE_TTL);
};

const runConsumer = async () => {
    const consumer = kafka.consumer({ groupId: 'ws-app' });
    await consumer.connect();
    await consumer.subscribe({ topic: constants.DATA_SAVED });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const { requestId, data, message: msg, timestamp } = JSON.parse(message.value.toString());
                const ws = clients.get(requestId);
                
                if (ws && ws.readyState === ws.OPEN) {
                    console.log(`Sending message to client with requestId: ${requestId}`);
                    ws.send(JSON.stringify({ data, message: msg, timestamp }));
                } else {
                    console.log(`Buffering message for requestId: ${requestId}`);
                    bufferMessage(requestId, { data, message: msg, timestamp });
                }
            } catch (error) {
                console.error('Error processing Kafka message:', error);
            }
        },
    });
};

// Periodic cleanup of message buffer
setInterval(() => {
    const now = Date.now();
    for (const [requestId, messages] of messageBuffer.entries()) {
        messageBuffer.set(requestId, messages.filter(msg => now - msg.timestamp < MESSAGE_TTL));
        if (messageBuffer.get(requestId).length === 0) {
            messageBuffer.delete(requestId);
        }
    }
}, 60000); // Run every minute

runConsumer().catch(console.error);