const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
//const cors = require('@koa/cors');
const app = express();
const db = require('./models');
const Role = db.roles;
const PORT = 3030;


//Routes 
const mainRoutes = require('./routes/mainRoutes')
const applications = require('./routes/applications');
const users = require('./routes/users');
const auth = require('./routes/auth');


app.use(express.json());
app.use(bodyParser());
app.use(bodyParser.json({limit: "30mb", extended: true  }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.set('port', process.env.PORT || 3030);
//app.use(cors());


//Uses the routes
app.use('/', mainRoutes)
app.use('/applications', applications);
app.use('/users', users)
app.use('/auth', auth)




//Creates module but if module already exists, doesn't overwrite it
db.sequelize.sync()
    .then((req) => {
      app.listen(PORT, () => {
          console.log('Server is running on Port 3030')
      });
      /*Role.create({
        id: 1,
        name: "user"
      });
      Role.create({
        id: 2,
        name: "admin"
      });*/
    })
    .catch(err => {
      console.error('Unable ro create roles', err)
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


