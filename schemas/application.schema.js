module.exports = {

	"$schema": "http://json-schema.org/draft-04/schema#",
	"id": "/application",
	"title": "Application",
	"description": "Application for a trading company",
	"type": "object",
	"properties": {
		"business_name": {
			"description": "The name of the business applying for a trading company ",
			"type": "string"
		},
		"description": {
				"description": "Description of the business applying",
				"type": "string"
		},
		"address": {
				"description": "Address of bussiness",
				"type": "string"
		},
		"date_founded": {
				"description": "When was the business founded",
				"type": "string"
		},
		"userId": {
				"description": "Who does the business belong to",
				"type": "integer"
		},
	},
	"required": ["business_name", "description", "address", "date_founded", "userId"]

}