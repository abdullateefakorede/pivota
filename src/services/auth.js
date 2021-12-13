const responseHelper = require('../helpers/response');
const errorHelper = require('../helpers/error');
const queryHelper = require('../helpers/query');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

class AuthService {
	static generateToken(data) {
		return jwt.sign(data, config.secret, { expiresIn: '10h' });
	}

	static decodeToken(token) {
		return jwt.verify(token, config.secret);
	}

	static async hashPassword(password, saltRound) {
		const salt = await bcrypt.genSalt(saltRound);
		return await bcrypt.hash(password, salt);
	}

	static async signIn(model, req, res) {
		try {
			const { email, password } = req.body;
			const user = await model.findOne({ where: { email } });
			if (!user || !await bcrypt.compare(password, user.password)) {
				return errorHelper.handleError('INCORRECT_EMAIL_OR_PASSWORD', res);
			}
			const data = { email: user.email, id: user.id };
			const token = AuthService.generateToken(data);
			AuthService.decodeToken(token);
			req.user = data;
			return responseHelper.sendSuccessResponse(res, { token, user: data }, 'LOGIN_SUCCESSFUL');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async signUp(model, req, res) {
		try {
			const user = await model.findOne({ where: { email: req.body.email } });
			if (user) {
				return errorHelper.handleError('USER_ALREADY_EXIST_PLEASE_SIGNIN', res);
			}
			const password = await AuthService.hashPassword(req.body.password, 10);
			const newUser = {
				...req.body,
				password
			};
			await model.create(newUser);
			const data = queryHelper.hidePassword(newUser);
			return responseHelper.sendSuccessResponse(res, { data }, 'SIGNUP_SUCCESSFUL');
		} catch (error) {
			return errorHelper.handleError(error, res);
		}
	}

	static async signOut(req, res) {
		return responseHelper.sendSuccessResponse(res, {}, 'SIGNOUT_SUCCESSFUL');
	}
}

module.exports = AuthService;