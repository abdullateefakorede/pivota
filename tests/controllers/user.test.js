const { mockRequest, mockResponse } = require('mock-req-res');
const { User } = require('../../database/models');
const UserController = require('../../src/controllers/user');
const AuthService = require('../../src/services/auth');

describe('UserController', () => {
	beforeEach(() => jest.clearAllMocks());
	describe('userSignIn', () => {
		test('should call SignIn Service', async () => {
			const mockReq = mockRequest({
				body: {
					email: 'test@gmail.com',
					password: 'Test2021@',
				},
			});
			const mockRes = mockResponse();
			const mockSignIn = jest.spyOn(AuthService, 'signIn');

			await UserController.userSignIn(mockReq, mockRes);

			expect(mockSignIn).toHaveBeenCalledTimes(1);
			expect(mockSignIn).toHaveBeenCalledWith(User, mockReq, mockRes);
		});
	});

	describe('userSignUp', () => {
		test('should call SignUp Service', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					organizationName: 'test format',
					email: 'test@gmail.com',
					password: 'test201@',
					phoneNumber: '07037464623',
				},
			});
			const mockRes = mockResponse();
			const mockSignUp = jest.spyOn(AuthService, 'signUp');

			await UserController.userSignUp(mockReq, mockRes);

			expect(mockSignUp).toHaveBeenCalledTimes(1);
			expect(mockSignUp).toHaveBeenCalledWith(User, mockReq, mockRes);
		});
	});
});
