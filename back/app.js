const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api/memento', (req,res) => {
    console.log(`----------------------`);
    console.log(`Recover data from API memento.`);
    if(res.statusCode !== 200) {
        throw new Error('App not found!');
    }
    else {
        const fileData = fs.readFileSync('db.json');
        res.json(JSON.parse(fileData));
    }
    console.log(`Recover data finished.`);
    console.log(`----------------------`);
});

module.exports = app;