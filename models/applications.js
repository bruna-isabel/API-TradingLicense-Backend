// Listings Model
//const db = require('../helpers/database');

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
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_founded: {
            type: DataTypes.STRING
        }
    });
    /*Listing.associate = (models) {
        Listing.belongsTo(models.user)*/
        return Application;
}