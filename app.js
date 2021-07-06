const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

//Routes 
const mainRoutes = require('./routes/mainRoutes')
const applications = require('./routes/applications');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.use(express.json());
app.use(bodyParser());
app.use(bodyParser.json({limit: "30mb", extended: true  }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


//Uses the routes
app.use('/', mainRoutes)
app.use('/applications', applications);
app.use('/users', users)
app.use('/auth', auth)

module.exports = app;





