const mongoose = require('mongoose');
const config = require('config');
const customerModel = require('./models/customerModel');

const dbConnect = async () => {
    const db = config.get('mongo');
    const { username, password, host, port, database } = db;
    return mongoose
      .connect(
        `mongodb://${username}:${password}@${host}:${port}/${database}`,
        )
      .then(() => console.log(` 🍃 mongo-db connected`))
      .catch(console.log)
  }
  
  
  module.exports = { db: mongoose, customerModel, dbConnect };