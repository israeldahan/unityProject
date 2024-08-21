const customerModel = require("../../db/models/customerModel");
const { producer } = require("../kafka");
const { DATA_SAVED } = require("../../constants");

const customerCreate = async (message) => {
  try {
    const { requestId, customer_data , timestamp } = JSON.parse(message.value.toString());

    const newData = new customerModel({
      username: customer_data.username,
      userid: customer_data.userid,
      price: customer_data.price,
      timestamp: timestamp,
    });

    await newData.save();
    producer.send({
      topic: DATA_SAVED,
      messages: [
        {
          value: JSON.stringify({
            requestId,
            data: newData,
            message: "Customer created",
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { customerCreate };
