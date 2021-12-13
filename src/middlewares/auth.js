const responseHelper = require('../helpers/response');
const AuthService = require('../services/auth');

exports.authenticateUser = (req,res,next) => {
	const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

	if (!token) {
		return responseHelper.sendErrorResponse(res, {}, 'NO_TOKEN_PROVIDED');
	}
	try {
		const decoded = AuthService.decodeToken(token);
		req.user = decoded;
		return next();

	} catch (error) {
		return responseHelper.sendErrorResponse(res, {}, 'BAD_/_EXPIRED_TOKEN');
	}
};