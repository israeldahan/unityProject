const customerServices = require('../services/customer-services');

const getCustomers = async (req, res) => {
    try {

        const method = req.method;
        let { limit, offset } = req.query;

        limit = limit ? parseInt(limit) : 10;
        offset = offset ? parseInt(offset) : 0;
        
        const requestId = await customerServices.getCustomers( method, limit, offset );
        res.status(202).json({
            message: 'Request accepted',
            requestId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCustomerById = async (req, res) => {
    try {
        const method = req.method;
        const requestId = await customerServices.getCustomerById( method, req.params.id );
        res.status(202).json({
            message: 'Request accepted',
            requestId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createCustomer = async (req, res) => {
    try {
        const { username, userid, price } = req.body;
        if (!username || !userid || !price) {
            return res.status(400).json({ message: 'Invalid input' });
        }
        const method = req.method;
        const requestId = await customerServices.createCustomer( method, req.body );
        res.status(202).json({
            message: 'Request accepted',
            requestId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer
};