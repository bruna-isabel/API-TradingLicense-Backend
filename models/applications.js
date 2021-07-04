

	/**

		* A module to run JSON Schema based validation on request/response data.

		* @module models/application

		* @author Bruna Coimbra

		* @see schemas/* for JSON Schema definition files

*/

const {User} = require("../models/users");

module.exports = (sequelize, DataTypes) => {
		
	/**

		* @function

		* @model Application - applications model 

*/
	
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
    