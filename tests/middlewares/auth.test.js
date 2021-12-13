const { mockRequest, mockResponse } = require('mock-req-res');
const responseHelper = require('../../src/helpers/response');
const AuthMiddleware = require('../../src/middlewares/auth');

describe('authenticateUser', () => {
	beforeEach(() => jest.clearAllMocks());
	test('should call sendErrorResponse when no token is provided', () => {
		const mockReq = mockRequest({
			headers: {},
		});
		const mockRes = mockResponse();
		const mockNext = jest.fn();
		const message = 'NO_TOKEN_PROVIDED';
		const mockSendErrorResponse = jest.spyOn(
			responseHelper,
			'sendErrorResponse',
		);

		AuthMiddleware.authenticateUser(mockReq, mockRes, mockNext);

		expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
		expect(mockSendErrorResponse).toHaveBeenCalledWith(mockRes, {}, message);
	});
	test('should call sendErrorResponse when token is bad/expired', () => {
		const mockReq = mockRequest({
			headers: {
				authorization: 'Bearer 267r62ygfwguywef6rfgywufguy2f63f6',
			},
		});
		const mockRes = mockResponse();
		const mockNext = jest.fn();
		const message = 'BAD_/_EXPIRED_TOKEN';
		const mockSendErrorResponse = jest.spyOn(
			responseHelper,
			'sendErrorResponse',
		);

		AuthMiddleware.authenticateUser(mockReq, mockRes, mockNext);

		expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
		expect(mockSendErrorResponse).toHaveBeenCalledWith(mockRes, {}, message);
	});
});
