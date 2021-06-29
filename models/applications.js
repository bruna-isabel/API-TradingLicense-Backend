// Listings Model
//const db = require('../helpers/database');

const User = require("./users");

module.exports = (sequelize, DataTypes) => {
    const Application = sequelize.define("Application", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        business_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_founded: {
            type: DataTypes.STRING
        },
        authorId: {
            type: DataTypes.STRING
        }
    });
    Application.associate = (models) => {
        Application.belongsTo(models.User, {foreignKey: 'ID', as: 'application'});
      };
        return Application;
}