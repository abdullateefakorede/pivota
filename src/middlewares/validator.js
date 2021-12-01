const Joi = require('joi');
const responseHelper = require('../helpers/response');

exports.requestValidator = async (res, next, schema, data) => {
	try {
		await schema.validateAsync(data, { abortEarly: false });
		return next();
	} catch (error) {
		return responseHelper.sendErrorResponse(res, { error: error.details }, 'SOMETHING_WENT_WRONG', 400);
	}
};

exports.signin = (req, res, next) => {
	const schema = Joi.object({ 
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().required().min(7)
	});
	return this.requestValidator(res, next, schema, req.body);
};

exports.userSignUp = (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string().min(3).required(),
		organizationName: Joi.string().min(7).required(),
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().required().min(7),
		phoneNumber: Joi.string().min(9).required(),
	});
	return this.requestValidator(res, next, schema, req.body);
};

exports.voterSignUp = (req, res, next) => {
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
	return this.requestValidator(res, next, schema, req.body);
};

exports.candidateSignUp = (req, res, next) => {
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
	return this.requestValidator(res, next, schema, req.body);
};

exports.createContest = (req, res, next) => {
	const schema = Joi.object({
		contestName: Joi.string().min(3).required(),
		maxNoOfContestant: Joi.number().min(3)
	});
	return this.requestValidator(res, next, schema, req.body);
};