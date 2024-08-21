const config = require('config');

const TOPIC_CREATED = config.get('kafka.topics.customerCreated');
const TOPIC_GET = config.get('kafka.topics.customersGet');
const TOPIC_GET_BY_ID = config.get('kafka.topics.customerGetById');
const DATA_SAVED = config.get('kafka.topics.dataSaved');

module.exports = {
    TOPIC_CREATED,
    TOPIC_GET,
    TOPIC_GET_BY_ID,
    DATA_SAVED
};