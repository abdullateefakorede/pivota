const { mockRequest, mockResponse } = require('mock-req-res');
const { Voter } = require('../../database/models');
const VoterController = require('../../src/controllers/voter');
const AuthService = require('../../src/services/auth');

describe('VoterController', () => {
	beforeEach(() => jest.clearAllMocks());
	describe('voterSignIn', () => {
		test('should call SignIn Service', async () => {
			const mockReq = mockRequest({
				body: {
					email: 'test@gmail.com',
					password: 'Test2021@',
				},
			});
			const mockRes = mockResponse();
			const mockSignIn = jest.spyOn(AuthService, 'signIn');

			await VoterController.voterSignIn(mockReq, mockRes);

			expect(mockSignIn).toHaveBeenCalledTimes(1);
			expect(mockSignIn).toHaveBeenCalledWith(Voter, mockReq, mockRes);
		});
	});

	describe('voterSignUp', () => {
		test('should call SignUp Service', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					nickName: 'testy',
					email: 'test@gmail.com',
					password: 'test201@',
					phoneNumber: '07037464623',
					dateOfBirth: '12-10-2001',
				},
			});
			const mockRes = mockResponse();
			const mockSignUp = jest.spyOn(AuthService, 'signUp');

			await VoterController.voterSignUp(mockReq, mockRes);

			expect(mockSignUp).toHaveBeenCalledTimes(1);
			expect(mockSignUp).toHaveBeenCalledWith(Voter, mockReq, mockRes);
		});
	});
});
