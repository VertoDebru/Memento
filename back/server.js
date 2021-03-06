require('dotenv').config();
const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const DB_MONGODB = process.env.DB_MONGODB;

const MY_HOST = process.env.MY_HOST;
const MY_PORT = process.env.PORT || process.env.MY_PORT;

app.set('port', MY_PORT);
const server = http.createServer(app);

server.on('error', (err) => {
    console.log(`Server Error | ${err}`);
});
server.listen(MY_PORT, () => {
    console.log(`Server host : ${MY_HOST} running on port : ${MY_PORT}`);
    mongoose.connect(DB_MONGODB,
        {useNewUrlParser : true,
        useUnifiedTopology : true})
    .then( () => {
        console.log(`MongoDB connected.`);
    })
    .catch( () => {
        console.log('MongoDB failed!');
    });
});
