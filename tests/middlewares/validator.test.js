const Joi = require('joi');
const responseHelper = require('../../src/helpers/response');
const validatorMiddlewares = require('../../src/middlewares/validator');
const { mockRequest, mockResponse } = require('mock-req-res');

describe('Validator Test', () => {
	describe('Request Validator', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		test('Next should be called if valid details are provided', async () => {
			const mockReq = mockRequest({ body: { name: 'Tolulope' } });
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const schema = Joi.object({
				name: Joi.string().alphanum().min(6).max(30).required(),
			});
			const mockValidateAsync = jest.spyOn(schema, 'validateAsync');

			await validatorMiddlewares.requestValidator(
				mockRes,
				mockNext,
				schema,
				mockReq.body,
			);

			expect(mockValidateAsync).toHaveBeenCalledWith(mockReq.body, {
				abortEarly: false,
			});
			expect(mockNext).toHaveBeenCalledTimes(1);
		});

		test('sendErrorResponse should be called if invalid details are provided', async () => {
			const mockReq = mockRequest({ body: { name: 'Bayo' } });
			const mockRes = mockResponse({ status: '400', send: jest.fn() });
			const mockNext = jest.fn();
			const message = 'SOMETHING_WENT_WRONG';
			const schema = Joi.object({
				name: Joi.string().alphanum().min(6).max(30).required(),
			});
			const mockValidateAsync = jest.spyOn(schema, 'validateAsync');
			const mockSendErrorResponse = jest.spyOn(
				responseHelper,
				'sendErrorResponse',
			);

			await validatorMiddlewares.requestValidator(
				mockRes,
				mockNext,
				schema,
				mockReq.body,
			);

			expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
			expect(mockValidateAsync).toHaveBeenCalledWith(mockReq.body, {
				abortEarly: false,
			});
			expect(mockSendErrorResponse).toHaveBeenCalledWith(
				mockRes,
				expect.any(Object),
				message,
			);
		});
	});

	describe('signIn', () => {
		beforeEach(() => jest.clearAllMocks());
		test('should call requestValidator when payload is valid', async () => {
			const mockReq = mockRequest({
				body: {
					email: 'test@gmail.com',
					password: 'test201@',
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);

			await validatorMiddlewares.signin(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockNext).toHaveBeenCalledTimes(1);
		});
		test('should return error when password is not upto minimum', async () => {
			const mockReq = mockRequest({
				body: {
					email: 'test@gmail.com',
					password: 'test2@',
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const message = 'SOMETHING_WENT_WRONG';
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);
			const mockSendErrorResponse = jest.spyOn(
				responseHelper,
				'sendErrorResponse',
			);

			await validatorMiddlewares.signin(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
			expect(mockSendErrorResponse).toHaveBeenCalledWith(
				mockRes,
				expect.any(Object),
				message,
			);
		});
	});

	describe('userSignUp', () => {
		beforeEach(() => jest.clearAllMocks());
		test('should call requestValidator when payload is valid', async () => {
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
			const mockNext = jest.fn();
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);

			await validatorMiddlewares.userSignUp(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockNext).toHaveBeenCalledTimes(1);
		});
		test('should return error when payload is missing an attribute', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					email: 'test@gmail.com',
					password: 'test201@',
					phoneNumber: '07037464623',
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const message = 'SOMETHING_WENT_WRONG';
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);
			const mockSendErrorResponse = jest.spyOn(
				responseHelper,
				'sendErrorResponse',
			);

			await validatorMiddlewares.userSignUp(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
			expect(mockSendErrorResponse).toHaveBeenCalledWith(
				mockRes,
				expect.any(Object),
				message,
			);
		});
	});

	describe('voterSignUp', () => {
		beforeEach(() => jest.clearAllMocks());
		test('should call requestValidator when payload is valid', async () => {
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
			const mockNext = jest.fn();
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);

			await validatorMiddlewares.voterSignUp(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockNext).toHaveBeenCalledTimes(1);
		});
		test('should call requestValidator when payload is valid without nickName and dateOfBirth attribute', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					email: 'test@gmail.com',
					password: 'test201@',
					phoneNumber: '07037464623',
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);

			await validatorMiddlewares.voterSignUp(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockNext).toHaveBeenCalledTimes(1);
		});
		test('should return error when dateOfBirth is not valid', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					nickName: 'testy',
					email: 'test@gmail.com',
					password: 'test201@',
					phoneNumber: '07037464623',
					dateOfBirth: '12-10-2008',
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const message = 'SOMETHING_WENT_WRONG';
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);
			const mockSendErrorResponse = jest.spyOn(
				responseHelper,
				'sendErrorResponse',
			);

			await validatorMiddlewares.voterSignUp(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
			expect(mockSendErrorResponse).toHaveBeenCalledWith(
				mockRes,
				expect.any(Object),
				message,
			);
		});
	});

	describe('candidateSignUp', () => {
		beforeEach(() => jest.clearAllMocks());
		test('should call requestValidator when payload is valid', async () => {
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
			const mockNext = jest.fn();
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);

			await validatorMiddlewares.candidateSignUp(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockNext).toHaveBeenCalledTimes(1);
		});
		test('should call requestValidator when payload is valid without nickName attribute', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					email: 'test@gmail.com',
					password: 'test201@',
					phoneNumber: '07037464623',
					dateOfBirth: '12-10-1990',
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);

			await validatorMiddlewares.candidateSignUp(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockNext).toHaveBeenCalledTimes(1);
		});
		test('should return error when dateOfBirth is not valid', async () => {
			const mockReq = mockRequest({
				body: {
					firstName: 'test',
					lastName: 'test',
					nickName: 'testy',
					email: 'test@gmail.com',
					password: 'test201@',
					phoneNumber: '07037464623',
					dateOfBirth: '12-10-2008',
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const message = 'SOMETHING_WENT_WRONG';
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);
			const mockSendErrorResponse = jest.spyOn(
				responseHelper,
				'sendErrorResponse',
			);

			await validatorMiddlewares.candidateSignUp(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
			expect(mockSendErrorResponse).toHaveBeenCalledWith(
				mockRes,
				expect.any(Object),
				message,
			);
		});
	});

	describe('createContest', () => {
		beforeEach(() => jest.clearAllMocks());
		test('should call requestValidator when the payload is valid', async () => {
			const mockReq = mockRequest({
				body: {
					contestName: 'test contest',
					maxNoOfContestant: 10,
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);

			await validatorMiddlewares.createContest(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockNext).toHaveBeenCalledTimes(1);
		});
		test('should call requestValidator when the payload is valid without maxNoOfContestant', async () => {
			const mockReq = mockRequest({
				body: {
					contestName: 'test contest',
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);

			await validatorMiddlewares.createContest(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockNext).toHaveBeenCalledTimes(1);
		});
		test('should call sendErrorResponse when the payload is invalid', async () => {
			const mockReq = mockRequest({
				body: {
					maxNoOfContestant: 10,
				},
			});
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const message = 'SOMETHING_WENT_WRONG';
			const mockRequestValidator = jest.spyOn(
				validatorMiddlewares,
				'requestValidator',
			);
			const mockSendErrorResponse = jest.spyOn(
				responseHelper,
				'sendErrorResponse',
			);

			await validatorMiddlewares.createContest(mockReq, mockRes, mockNext);

			expect(mockRequestValidator).toHaveBeenCalledTimes(1);
			expect(mockRequestValidator).toHaveBeenCalledWith(
				mockRes,
				mockNext,
				expect.any(Object),
				mockReq.body,
			);
			expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
			expect(mockSendErrorResponse).toHaveBeenCalledWith(
				mockRes,
				expect.any(Object),
				message,
			);
		});
	});
});
