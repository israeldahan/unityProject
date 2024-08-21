const { v4: uuidv4 } = require('uuid');
const { Kafka, Partitioners } = require('kafkajs');
const config = require('config');
const constants = require('../constants');

const kafka = new Kafka({
    clientId: 'customer-api',
    brokers: config.get('kafka.brokers')
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

const getCustomers = async ( method, limit, offset ) => {
    const requestId = uuidv4();
    const message = {
        requestId,
        message: 'Get all customer',
        method,
        timestamp: new Date().toISOString(),
        metadata: {
            limit,
            offset
        }
    };

    await producer.connect();
    await producer.send({
        topic: constants.TOPIC_GET,
        messages: [
            { value: JSON.stringify(message) }
        ]
    });
    return requestId;
}

const getCustomerById = async (method, id) => {
    const requestId = uuidv4();
    const message = {
        requestId,
        message: 'Get consumer by id',
        method,
        timestamp: new Date().toISOString(),
        metadata: {
            userid: id,
        }
    };

    await producer.connect();
    await producer.send({
        topic: constants.TOPIC_GET_BY_ID,
        messages: [
            { value: JSON.stringify(message) }
        ]
    });
    return requestId;
}

const createCustomer = async (method, body) => {
    const requestId = uuidv4();
    const message = {
        requestId,
        message: 'Create consumer',
        method,
        customer_data: body,
        timestamp: new Date().toISOString()
    };

    await producer.connect();
    await producer.send({
        topic: constants.TOPIC_CREATED,
        messages: [
            { value: JSON.stringify(message) }
        ]
    });
    return requestId;
}

module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer
};