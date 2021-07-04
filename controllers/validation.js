/**

* A module to run JSON Schema based validation on request/response data.

* @module controllers/validation

* @author Bruna Coimbra

* @see schemas/* for JSON Schema definition files

*/

const {Validator, ValidationError} = require('jsonschema');
const applicationSchema = require('../schemas/application.json');
const userSchema = require('../schemas/user.json');


const v = new Validator();

exports.validateApplication = async (ctx, next) => {

	const validationOptions = {
		throwError: true,
		allowUnknownAttributes: false
	};

	const body = ctx.request.body;
	try {
		v.validate(body, applicationSchema, validationOptions);
		await next();

	} catch (error) {
		if (error instanceof ValidationError) {

			ctx.body = error;
			ctx.status = 400;

		} else {
			throw error;
		}
	}
}



exports.validateUser = async (ctx, next) => {

	const validationOptions = {
		throwError: true,
		allowUnknownAttributes: false
	};

	const body = ctx.request.body;
	try {
		v.validate(body, userSchema, validationOptions);
		await next();

	} catch (error) {
		if (error instanceof ValidationError) {

			ctx.body = error;
			ctx.status = 400;

		} else {

			throw error;
		}
	}
}