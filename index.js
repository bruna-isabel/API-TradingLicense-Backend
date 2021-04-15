const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./database.js')

const app = express();

//to upload photos 
app.use(bodyParser.json({limit: "30mb", extended: true  }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors);

app.listen(3000, () => {
    console.log('Server is running on Port 3000')
})