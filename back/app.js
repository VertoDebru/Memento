require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routesCategories = require('./routes/categories');
const routesMemos = require('./routes/memos');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    next();
});
app.use(bodyParser.json());

app.use('/api/memento/categories', routesCategories);
app.use('/api/memento/memos', routesMemos);

module.exports = app;
