module.exports = {

	"$schema": "http://json-schema.org/draft-04/schema#",
	"id": "/user",
	"title": "User",
	"description": "Users that use web api",
	"type": "object",
	"properties": {
		"name": {
			"description": "Name of user ",
			"type": "string"
		}
		"email": {
				"description": "Email of user",
				"type": "string"
		},
		"password": {
				"description": "Password of user",
				"type": "string"
		}
	"required": ["name", "email", "password"]

}