const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./helpers/database.js');

const app = express();

//Gets all the routes
const listings = require('./routes/listings');

//Uses the routes
app.use('/listings', listings);

//To upload photos 
app.use(bodyParser.json({limit: "30mb", extended: true  }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors);

app.listen(3000, () => {
    console.log('Server is running on Port 3000')
})