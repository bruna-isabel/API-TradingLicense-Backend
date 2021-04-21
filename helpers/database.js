const { reject } = require('bluebird');
const mysql = require('promise-mysql');
const db_info = require('../config')

exports.run_query = async function run_query(query, values) {
    try {
        const connection = await mysql.createConnection(db_info.config);
        let data = await connection.query(query, values);
        await connection.end()
        console.log("Database Connected!")
        return data;

    } catch (err) {
        console.error(err, query, values);
        throw 'Database Query Error';
    }
}
