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

/*
//Gets all the Dog Listings 
exports.getListings = async function getListings() {
    const query = "SELECT * FROM listings;";
    const data = await db.run_query(query);
    return data;
}

//Allows creation of listings
exports.createListing = async function createListing(listing) {
    const query = 'INSERT INTO listings SET ? ;';
    const data = await db.run_query(query, listing);
    return data;
}

//Gets an individual listing
exports.getListingById = async function getListingById(id) {
    const query = "SELECT * FROM listings WHERE id = ?";
    const values = [id];
    const data = await db.run_query(query, values);
    return data;
}

//Updates a listing 
exports.updateListing = async function updateListing() {
    const query = "UPDATE listings SET ? WHERE id = ?;";
    const data = await db.run_query(query);
    return data;
}

//Deletes a listing
exports.deleteListing = async function deleteListing() {
    const query = "DELETE FROM listings WHERE id = ?;";
    const data = await db.run_query(query);
    return data;
}


module.exports = {
    getListings, 
    createListing,
    getListingById,
    updateListing,
    deleteListing
}*/
