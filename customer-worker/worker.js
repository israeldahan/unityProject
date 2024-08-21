const { consumer, producer } = require("./kafka/kafka");
const { dbConnect } = require("./db/db");

const CONSTANTS = require("./constants");

dbConnect();

const { customerCreate } = require("./kafka/consumers/customer-create");
const { customersGet } = require("./kafka/consumers/customers-get");
const { customersGetById } = require("./kafka/consumers/customer-get-by-id");

const run = async () => {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: CONSTANTS.TOPIC_CREATED });
  await consumer.subscribe({ topic: CONSTANTS.TOPIC_GET });
  await consumer.subscribe({ topic: CONSTANTS.TOPIC_GET_BY_ID });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case CONSTANTS.TOPIC_CREATED:
          await customerCreate(message);
          break;
        case CONSTANTS.TOPIC_GET:
          await customersGet(message);
          break;
        case CONSTANTS.TOPIC_GET_BY_ID:
          await customersGetById(message);
          break;
        default:
          break;
      }
    },
  });
};

run().catch(console.error);
