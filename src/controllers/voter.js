const { Voter } = require('../../database/models');
const AuthService = require('../services/auth');

class VoterController {
	static async voterSignIn(req, res) {
		AuthService.signIn(Voter, req, res);
	}

	static async voterSignUp(req, res) {
		AuthService.SignUp(Voter, req, res);
	}
}

module.exports = VoterController;