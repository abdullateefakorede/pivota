const { Voter } = require('../../database/models');
const AuthService = require('../services/auth');

class VoterController {
	static async voterSignIn(req, res) {
		await AuthService.signIn(Voter, req, res);
	}

	static async voterSignUp(req, res) {
		await AuthService.signUp(Voter, req, res);
	}
}

module.exports = VoterController;