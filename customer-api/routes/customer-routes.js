const { Router } = require('express');
const customerRouter = Router();
const customerController = require('../controllers/customer-controllers');

customerRouter.get('/customers', customerController.getCustomers);
customerRouter.get('/customers/:id', customerController.getCustomerById);
customerRouter.post('/customers', customerController.createCustomer);

module.exports = customerRouter;