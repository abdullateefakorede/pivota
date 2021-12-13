const { mockRequest, mockResponse } = require('mock-req-res');
const { User } = require('../../database/models');
const AuthService = require('../../src/services/auth');
const responseHelper = require('../../src/helpers/response');
const errorHelper = require('../../src/helpers/error');
const bcrypt = require('bcryptjs/dist/bcrypt');
const queryHelper = require('../../src/helpers/query');

describe('AuthService', () => {
	beforeEach(() => jest.clearAllMocks());
	describe('signIn', () => {
		test('should call sendSuccessResponse when details is valid', async () => {
			const mockReq = mockRequest({
				body: {
					email: 'UserTest@gmail.com',
					password: 'userTest2021@',
				},
			});
			const mockRes = mockResponse();
			const user = User.build({
				email: 'UserTest@gmail.com',
				id: 1,
				password:
          '$2a$10$/mJG/U/gl4zaUDAYOnyP7.8VbVQoU1liUV.8XeTmFRCWlk/DEl8nG',
			});
			const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlVzZXJUZXN0QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MzkzOTY4NDEsImV4cCI6MTYzOTQzMjg0MX0.rcJvJX1_Ld4VXajS30kaUUogS_78sTkhLgcnMWdPin8';
			const data = { email: 'UserTest@gmail.com', id: 1 };
			const message = 'LOGIN_SUCCESSFUL';
			const mockFindOne = jest
				.spyOn(User, 'findOne')
				.mockImplementationOnce(() => user);
			const mockCompare = jest.spyOn(bcrypt, 'compare');
			const mockGenerateToken = jest
				.spyOn(AuthService, 'generateToken')
				.mockImplementationOnce(() => token);
			const mockSendSuccessResponse = jest.spyOn(
				responseHelper,
				'sendSuccessResponse',
			);

			await AuthService.signIn(User, mockReq, mockRes);

			expect(mockFindOne).toHaveBeenCalledTimes(1);
			expect(mockFindOne).toHaveBeenCalledWith({
				where: { email: mockReq.body.email },
			});
			expect(mockCompare).toHaveBeenCalledTimes(1);
			expect(mockCompare).toHaveBeenCalledWith(
				mockReq.body.password,
				user.password,
			);
			expect(mockGenerateToken).toHaveBeenCalledTimes(1);
			expect(mockGenerateToken).toHaveBeenCalledWith(data);
			expect(mockSendSuccessResponse).toHaveBeenCalledTimes(1);
			expect(mockSendSuccessResponse).toHaveBeenCalledWith(
				mockRes,
				{ token, user: data },
				message,
			);
		});
		test('should call handleError when password is invalid', async () => {
			const mockReq = mockRequest({
				body: {
					email: 'UserTest@gmail.com',
					password: 'userTest20@',
				},
			});
			const mockRes = mockResponse();
			const user = User.build({
				email: 'UserTest@gmail.com',
				id: 1,
				password:
          '$2a$10$/mJG/U/gl4zaUDAYOnyP7.8VbVQoU1liUV.8XeTmFRCWlk/DEl8nG',
			});
			const message = 'INCORRECT_EMAIL_OR_PASSWORD';
			const mockFindOne = jest
				.spyOn(User, 'findOne')
				.mockImplementationOnce(() => user);
			const mockCompare = jest.spyOn(bcrypt, 'compare');
			const mockHandleError = jest.spyOn(errorHelper, 'handleError');

			await AuthService.signIn(User, mockReq, mockRes);

			expect(mockFindOne).toHaveBeenCalledTimes(1);
			expect(mockFindOne).toHaveBeenCalledWith({
				where: { email: mockReq.body.email },
			});
			expect(mockCompare).toHaveBeenCalledTimes(1);
			expect(mockCompare).toHaveBeenCalledWith(
				mockReq.body.password,
				user.password,
			);
			expect(mockHandleError).toHaveBeenCalledTimes(1);
			expect(mockHandleError).toHaveBeenCalledWith(message, mockRes);
		});
	});

	describe('signUp', () => {
		test('should call sendSuccessResponse when details is valid', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					organizationName: 'test format',
					email: 'UserTest3@gmail.com',
					password: 'userTest2021@',
					phoneNumber: '07037464623',
				},
			});
			const mockRes = mockResponse();
			const user = undefined;
			const newUser = User.build();
			const message = 'SIGNUP_SUCCESSFUL';
			const data = {
				firstName: 'test',
				lastName: 'test',
				organizationName: 'test format',
				email: 'UserTest3@gmail.com',
				phoneNumber: '07037464623',
			};
			const mockFindOne = jest
				.spyOn(User, 'findOne')
				.mockImplementationOnce(() => user);
			const mockCreate = jest
				.spyOn(User, 'create')
				.mockImplementationOnce(() => newUser);
			const hashedPassword = 'hwfrfgwfgy#rwbyrhb@53rft.23-fx6vx3r2t';
			const mockHashPassword = jest.spyOn(AuthService, 'hashPassword').mockImplementationOnce(()=> hashedPassword);
			const mockHidePassword = jest.spyOn(queryHelper, 'hidePassword').mockImplementationOnce(()=> data);
			const mockSendSuccessResponse = jest.spyOn(
				responseHelper,
				'sendSuccessResponse',
			);

			await AuthService.signUp(User, mockReq, mockRes);

			expect(mockHashPassword).toHaveBeenCalledTimes(1);
			expect(mockHashPassword).toHaveBeenCalledWith(mockReq.body.password, 10);
			expect(mockFindOne).toHaveBeenCalledTimes(1);
			expect(mockFindOne).toHaveBeenCalledWith({
				where: { email: mockReq.body.email },
			});
			expect(mockCreate).toHaveBeenCalledTimes(1);
			expect(mockCreate).toHaveBeenCalledWith({
				...mockReq.body,
				password: hashedPassword
			});
			expect(mockHidePassword).toHaveBeenCalledTimes(1);
			expect(mockHidePassword).toHaveBeenCalledWith({
				...mockReq.body,
				password: hashedPassword
			});
			expect(mockSendSuccessResponse).toHaveBeenCalledTimes(1);
			expect(mockSendSuccessResponse).toHaveBeenCalledWith(
				mockRes,
				{ data },
				message,
			);
		});
		test('should call handleError when password is invalid', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					organizationName: 'test format',
					email: 'UserTest@gmail.com',
					password: 'userTest2021@',
					phoneNumber: '07037464623',
				},
			});
			const mockRes = mockResponse();
			const user = User.build({
				email: 'UserTest@gmail.com',
			});
			const message = 'USER_ALREADY_EXIST_PLEASE_SIGNIN';
			const mockFindOne = jest
				.spyOn(User, 'findOne')
				.mockImplementationOnce(() => user);
			const mockHandleError = jest.spyOn(errorHelper, 'handleError');

			await AuthService.signUp(User, mockReq, mockRes);

			expect(mockFindOne).toHaveBeenCalledTimes(1);
			expect(mockFindOne).toHaveBeenCalledWith({
				where: { email: mockReq.body.email },
			});
			expect(mockHandleError).toHaveBeenCalledTimes(1);
			expect(mockHandleError).toHaveBeenCalledWith(message, mockRes);
		});
	});
});
