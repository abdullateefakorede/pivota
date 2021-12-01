const { Candidate } = require('../../database/models');
const AuthService = require('../services/auth');

class CandidateController {
	static async candidateSignIn(req, res) {
			await AuthService.signIn(Candidate, req, res)
	}

	static async candidateSignUp(req, res) {
		await AuthService.SignUp(Candidate, req, res)
	}
}

module.exports = CandidateController;