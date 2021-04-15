// Listings Model
const db = require('..helpers/database');

exports.getListings = async function getListings() {
    const query = "SELECT * FROM listings;";
    const data = await db.run_query(query);
    return data;
}

exports.createListing = async function createListing() {
    const query = "INSERT INTO listings SET ?;";
    const data = await db.run_query(query);
    return data;
}

exports.getListingById = async function getListingById() {
    const query = "SELECT * FROM listings WHERE ID = ?;";
    const data = await db.run_query(query);
    return data;
}

exports.updateListing = async function updateListing() {
    const query = "UPDATE listings SET ? WHERE ID = ?;";
    const data = await db.run_query(query);
    return data;
}

exports.deleteListing = async function deleteListing() {
    const query = "DELETE FROM listings WHERE ID = ?;";
    const data = await db.run_query(query);
    return data;
}

/*
module.exports = {
    getListings, 
    createListing,
    getListingById,
    updateListing,
    deleteListing
}*/