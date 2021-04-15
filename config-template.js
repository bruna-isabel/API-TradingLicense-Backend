// Export database connection information.
exports.config = { 
	
	host: process.env.DB_HOST || "", 
	port: process.env.DB_PORT || 3006, 
	user: process.env.DB_USER || "", 
	password: process.env.DB_PASSWORD || "", 
	database: process.env.DB_DATABASE || "", 
	connection_limit: 100 
	
}
