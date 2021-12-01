const Joi = require('joi');
const responseHelper = require('../../src/helpers/response');
const validatorMiddlewares = require('../../src/middlewares/validator');
const { mockRequest, mockResponse } = require('mock-req-res');

describe('Validator Test', ()=>{
	describe('Request Validator', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		test('Next should be called if valid details are provided', async () => {
			const mockReq = mockRequest({ body: { name: 'Tolulope' } });
			const mockRes = mockResponse();
			const mockNext = jest.fn();
			const schema = Joi.object({ name: Joi.string().alphanum().min(6).max(30).required() });
			const mockValidateAsync = jest.spyOn(schema, 'validateAsync');
	
			await validatorMiddlewares.requestValidator(mockRes, mockNext, schema, mockReq.body);
	
			expect(mockValidateAsync).toHaveBeenCalledWith(mockReq.body, { abortEarly: false });
			expect(mockNext).toHaveBeenCalledTimes(1);
		});

		test('sendErrorResponse should be called if invalid details are provided', async () => {
			const mockReq = mockRequest({ body: { name: 'Bayo' } });
			const mockRes = mockResponse({ status: '400', send: jest.fn() });
			const mockNext = jest.fn();
			const message = 'SOMETHING_WENT_WRONG';
			const status = 400;
			const schema = Joi.object({ name: Joi.string().alphanum().min(6).max(30).required() });
			const mockValidateAsync = jest.spyOn(schema, 'validateAsync');
			const mockSendErrorResponse = jest.spyOn(responseHelper, 'sendErrorResponse');
	
			await validatorMiddlewares.requestValidator(mockRes, mockNext, schema, mockReq.body);
	
			expect(mockSendErrorResponse).toHaveBeenCalledTimes(1);
			expect(mockValidateAsync).toHaveBeenCalledWith(mockReq.body, { abortEarly: false });
			expect(mockSendErrorResponse).toHaveBeenCalledWith(mockRes, expect.any(Object), message, status);
		});
	});
});