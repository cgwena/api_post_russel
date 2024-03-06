const express = require('express');
const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL

const app = express();

(async () => {
    try {
        await mongoose.connect(MONGO_URL),
            console.log('Connection à Mongodb réussie !')
    } catch (err) {
        console.log('error: ' + err)
    }
})()

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

module.exports = app;