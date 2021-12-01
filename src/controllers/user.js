const { User } = require('../../database/models');
const AuthService = require('../services/auth');

class UserController {
	static async userSignIn(req, res) {
		AuthService.signIn(User, req, res)
	}

	static async userSignUp(req, res) {
		AuthService.SignUp(User, req, res)
	}
}

module.exports = UserController;