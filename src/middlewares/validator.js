const Joi = require('joi');
const responseHelper = require('../helpers/response');

exports.requestValidator = async (res, next, schema, data) => {
	try {
		await schema.validateAsync(data, { abortEarly: false });
		return next();
	} catch (error) {
		return responseHelper.sendErrorResponse(res, { error: error.details }, 'SOMETHING_WENT_WRONG');
	}
};

exports.signin = async (req, res, next) => {
	const schema = Joi.object({ 
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().required().min(7)
	});
	return await this.requestValidator(res, next, schema, req.body);
};

exports.userSignUp = async (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string().min(3).required(),
		organizationName: Joi.string().min(7).required(),
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().required().min(7),
		phoneNumber: Joi.string().min(9).required(),
	});
	return await this.requestValidator(res, next, schema, req.body);
};

exports.voterSignUp = async (req, res, next) => {
	const minDate = new Date().getFullYear() - 18;
	const schema = Joi.object({
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string().min(3).required(),
		nickName: Joi.string().min(3),
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().required().min(7),
		phoneNumber: Joi.string().min(9).required(),
		dateOfBirth: Joi.date().less(`1-1-${minDate}`),
	});
	return await this.requestValidator(res, next, schema, req.body);
};

exports.candidateSignUp = async (req, res, next) => {
	const minDate = new Date().getFullYear() - 20;
	const schema = Joi.object({
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string().min(3).required(),
		nickName: Joi.string().min(3),
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().required().min(7),
		phoneNumber: Joi.string().min(9).required(),
		dateOfBirth: Joi.date().less(`1-1-${minDate}`).required()
	});
	return await this.requestValidator(res, next, schema, req.body);
};

exports.createContest = async (req, res, next) => {
	const schema = Joi.object({
		contestName: Joi.string().min(3).required(),
		maxNoOfContestant: Joi.number().min(3)
	});
	return await this.requestValidator(res, next, schema, req.body);
};