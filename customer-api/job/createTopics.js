const { Kafka } = require('kafkajs');
const config = require('config');
const constants = require('../constants');

const kafka = new Kafka({
    clientId: 'customer-api',
    brokers: config.get('kafka.brokers')
});


const createTopics = async () => {
    const admin = kafka.admin();
    await admin.connect();
    
    await admin.createTopics({
        topics: [
            { topic: constants.TOPIC_CREATED, numPartitions: 3 },
            { topic: constants.TOPIC_GET_BY_ID, numPartitions: 3 },
            { topic: constants.TOPIC_GET, numPartitions: 3 },
            { topic: constants.DATA_SAVED, numPartitions: 3 },
        ]
    });

    await admin.disconnect();
}

createTopics().catch(console.error);