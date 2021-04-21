const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const db = require('./models');
const listings = require('./routes/listings');

const app = express();
app.use(express.json());

//Uses the routes
app.use('/listings', listings);

//To upload photos 
app.use(bodyParser.json({limit: "30mb", extended: true  }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors);


//Creates module but if module already exixts, doesn't overwrite it
db.sequelize.sync().then((req) => {
    app.listen(3000, () => {
        console.log('Server is running on Port 3000')
    });
});

// Database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

