// Listings Model
//const db = require('../helpers/database');

module.exports = (sequelize, DataTypes) => {
    const Listing = sequelize.define("Listing", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        dog_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        is_adopted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.STRING
        }
    });
    /*Listing.associate = (models) {
        Listing.belongsTo(models.user)*/
        return Listing;
}