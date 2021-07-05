const app = require('./app');
const db = require('./models');
const Role = db.roles;

let PORT = process.env.PORT || 3030;

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