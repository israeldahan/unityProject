const {Kafka, Partitioners} = require('kafkajs');
const config = require('config');

const kafka = new Kafka({
    clientId: 'customer-worker',
    brokers: config.get('kafka.brokers')
});

const consumer = kafka.consumer({groupId: 'customer-group'});
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });



module.exports = {consumer, producer};