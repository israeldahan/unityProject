const express = require('express');
const consumerRouter = require('./routes/customer-routes');
const cors = require('cors');
const app = express();
const port = 3000;

const LoggerMiddleware = require('./middleware/logger');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use( LoggerMiddleware );
app.use('/api', consumerRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});