const customerModel = require("../../db/models/customerModel");
const { producer } = require("../kafka");
const { DATA_SAVED } = require("../../constants");

const customersGetById = async (message) => {
  try {
    const { requestId, metadata: { userid } } = JSON.parse(message.value.toString());

    const data = await customerModel.find({userid});
    producer.send({
      topic: DATA_SAVED,
      messages: [
        {
          value: JSON.stringify({
            requestId,
            data,
            message: "Customer got by id",
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { customersGetById };
