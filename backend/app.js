const express = require('express');
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

(async () => {
    try {
        await mongoose.connect(MONGO_URL),
            console.log('Connection à Mongodb réussie !')
    } catch (err) {
        console.log('error: ' + err)
    }
})()

app.use(cookieParser());
app.use(bodyParser.json())
app.use('/api/', apiRoutes);



module.exports = app;