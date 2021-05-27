const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const { initial } = require('lodash');

const db = require('./models');
const Role = db.roles;

//routes
const home = require('./routes/home')
const applications = require('./routes/applications');
const users = require('./routes/users');

const app = express();
app.use(express.json());

//Uses the routes
app.use('/', home)
app.use('/applications', applications);
app.use('/users', users)


//To upload photos 
app.use(bodyParser.json({limit: "30mb", extended: true  }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors);


//Creates module but if module already exixts, doesn't overwrite it
db.sequelize.sync().then((req) => {
    app.listen(5000, () => {
        console.log('Server is running on Port 5000')
    });
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "admin"
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


