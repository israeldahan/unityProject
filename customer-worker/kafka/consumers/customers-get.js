const customerModel = require("../../db/models/customerModel");
const { producer } = require("../kafka");
const { DATA_SAVED } = require("../../constants");

const customersGet = async (message) => {
  try {
    const { requestId, metadata } = JSON.parse(message.value.toString());

    const data = await customerModel.find().skip(metadata.offset).limit(metadata.limit);
    console.log(`data: ${data}`);
    
    producer.send({
      topic: DATA_SAVED,
      messages: [
        {
          value: JSON.stringify({
            requestId,
            data,
            message: "Customer got",
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { customersGet };
