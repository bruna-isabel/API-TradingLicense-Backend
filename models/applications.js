// Listings Model
//const db = require('../helpers/database');

const {User} = require("../models/users");

module.exports = (sequelize, DataTypes) => {
		
	try { 
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
       
    })
		
		return Application;
		
	} catch(err) {
		
    if(err instanceof UniqueConstraintError){
        throw new Error('duplicate error')
    } else{
        throw err
    }
	}
	
}
    