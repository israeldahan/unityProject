const Logger = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = Logger;