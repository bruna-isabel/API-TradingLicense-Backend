'use strict';

const fs = require('fs');
const path = require('path');
const { REPL_MODE_SLOPPY } = require('repl');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("../models/users.js")(sequelize, Sequelize);
db.roles = require("../models/roles.js")(sequelize, Sequelize);
db.applications = require("../models/applications.js")(sequelize, Sequelize);

//roles
db.roles.hasMany(db.users);
db.users.belongsTo(db.roles);

//applications
db.users.hasMany(db.applications);
db.applications.belongsTo(db.users);


/*
db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.applications.belongsTo(db.users);
*/
//db.ROLES = ["user", "admin"];

//Some Mock Data
/*db.users =  [
  {id: 1, name: "Bruna", email: "bruna@email.com", password: "something", RoleId: 1},
  {id: 2, name: "Fred", email: "bruna@email.com", password: "something", RoleId: 2}
]

db.applications = [
  {id: 1, business_name: "Bruna's Application", description: "bruna's description", address: "Bruna's Address", UserId: 1},
  {id: 2, business_name: "Fred's Application", description: "fred's description", address: "Fred's Address", UserId: 2}
]*/


module.exports = db;