const { mockRequest, mockResponse } = require('mock-req-res');
const { Candidate } = require('../../database/models');
const CandidateController = require('../../src/controllers/candidate');
const AuthService = require('../../src/services/auth');

describe('CandidateController', () => {
	beforeEach(() => jest.clearAllMocks());
	describe('candidateSignIn', () => {
		test('should call SignIn Service', async () => {
			const mockReq = mockRequest({
				body: {
					email: 'test@gmail.com',
					password: 'Test2021@',
				},
			});
			const mockRes = mockResponse();
			const mockSignIn = jest.spyOn(AuthService, 'signIn');

			await CandidateController.candidateSignIn(mockReq, mockRes);

			expect(mockSignIn).toHaveBeenCalledTimes(1);
			expect(mockSignIn).toHaveBeenCalledWith(Candidate, mockReq, mockRes);
		});
	});

	describe('candidateSignUp', () => {
		test('should call SignUp Service', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					nickName: 'testy',
					email: 'test@gmail.com',
					password: 'test201@',
					phoneNumber: '07037464623',
					dateOfBirth: '12-10-1990',
				},
			});
			const mockRes = mockResponse();
			const mockSignUp = jest.spyOn(AuthService, 'signUp');

			await CandidateController.candidateSignUp(mockReq, mockRes);

			expect(mockSignUp).toHaveBeenCalledTimes(1);
			expect(mockSignUp).toHaveBeenCalledWith(Candidate, mockReq, mockRes);
		});
	});
});
