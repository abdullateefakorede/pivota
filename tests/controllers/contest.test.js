const { mockRequest, mockResponse } = require('mock-req-res');
const { Contest } = require('../../database/models');
const ContestController = require('../../src/controllers/contest');
const queryHelper = require('../../src/helpers/error');
const responseHelper = require('../../src/helpers/response');

describe('ContestController', () => {
	beforeEach(() => jest.clearAllMocks());
	describe('getContestById', () => {
		test('should call sendSuccessResponse when contestId is valid', async () => {
			const mockReq = mockRequest({
				params: {
					id: 1,
				},
			});
			const mockRes = mockResponse();
			const contest = Contest.build();
			const message = 'CONTEST_FOUND';
			const mockFindByPk = jest
				.spyOn(Contest, 'findByPk')
				.mockImplementationOnce(() => contest);
			const mockSendSuccessResponse = jest.spyOn(
				responseHelper,
				'sendSuccessResponse',
			);

			await ContestController.getContestById(mockReq, mockRes);

			expect(mockFindByPk).toHaveBeenCalledTimes(1);
			expect(mockFindByPk).toHaveBeenCalledWith(mockReq.params.id);
			expect(mockSendSuccessResponse).toHaveBeenCalledTimes(1);
			expect(mockSendSuccessResponse).toHaveBeenCalledWith(
				mockRes,
				{ contest },
				message,
			);
		});
		test('should call errorHelper when contest is not found', async () => {
			const mockReq = mockRequest({
				params: {
					id: 10846865,
				},
			});
			const mockRes = mockResponse();
			const contest = undefined;
			const error = 'NO_CONTEST_FOUND';
			const mockFindByPk = jest
				.spyOn(Contest, 'findByPk')
				.mockImplementationOnce(() => contest);
			const mockHandleError = jest.spyOn(queryHelper, 'handleError');

			await ContestController.getContestById(mockReq, mockRes);

			expect(mockFindByPk).toHaveBeenCalledTimes(1);
			expect(mockFindByPk).toHaveBeenCalledWith(mockReq.params.id);
			expect(mockHandleError).toHaveBeenCalledTimes(1);
			expect(mockHandleError).toHaveBeenCalledWith(error, mockRes);
		});
		test('should call errorHelper when it catch any error', async () => {
			const mockReq = mockRequest({
				params: {},
			});
			const mockRes = mockResponse();
			const error = new Error();
			const mockFindByPk = jest
				.spyOn(Contest, 'findByPk')
				.mockImplementationOnce(() => {
					throw error;
				});
			const mockHandleError = jest.spyOn(queryHelper, 'handleError');

			await ContestController.getContestById(mockReq, mockRes);

			expect(mockFindByPk).toHaveBeenCalledTimes(1);
			expect(mockFindByPk).toHaveBeenCalledWith(mockReq.params.id);
			expect(mockHandleError).toHaveBeenCalledTimes(1);
			expect(mockHandleError).toHaveBeenCalledWith(error, mockRes);
		});
	});

	describe('getContestsByUserId', () => {
		test('should call sendSuccessResponse when userId is valid', async () => {
			const mockReq = mockRequest({
				params: {
					id: 1,
				},
			});
			const mockRes = mockResponse();
			const contests = [
				{
					id: 1,
					contestName: 'Test Contest 1',
					totalContestant: 2,
					maxNoOfContestant: null,
					completed: false,
					totalVote: 1,
					user_id: 1,
					contest_thumb: null,
				},
				{
					id: 2,
					contestName: 'Test Contest 3',
					totalContestant: 1,
					maxNoOfContestant: null,
					completed: true,
					totalVote: 0,
					user_id: 1,
					contest_thumb: null,
				},
			];
			const message = 'CONTESTS_FOUND';
			const mockFindAll = jest
				.spyOn(Contest, 'findAll')
				.mockImplementationOnce(() => contests);
			const mockSendSuccessResponse = jest.spyOn(
				responseHelper,
				'sendSuccessResponse',
			);

			await ContestController.getContestsByUserId(mockReq, mockRes);

			expect(mockFindAll).toHaveBeenCalledTimes(1);
			expect(mockFindAll).toHaveBeenCalledWith({
				where: { user_id: mockReq.params.userId },
			});
			expect(mockSendSuccessResponse).toHaveBeenCalledTimes(1);
			expect(mockSendSuccessResponse).toHaveBeenCalledWith(
				mockRes,
				{ contests },
				message,
			);
		});
		test('should call errorHelper when userId is invalid', async () => {
			const mockReq = mockRequest({
				params: {
					userId: 1084676656,
				},
			});
			const mockRes = mockResponse();
			const contests = [];
			const error = 'NO_CONTEST_AVAILABLE';
			const mockFindAll = jest
				.spyOn(Contest, 'findAll')
				.mockImplementationOnce(() => contests);
			const mockHandleError = jest.spyOn(queryHelper, 'handleError');

			await ContestController.getContestsByUserId(mockReq, mockRes);

			expect(mockFindAll).toHaveBeenCalledTimes(1);
			expect(mockFindAll).toHaveBeenCalledWith({
				where: { user_id: mockReq.params.userId },
			});
			expect(mockHandleError).toHaveBeenCalledTimes(1);
			expect(mockHandleError).toHaveBeenCalledWith(error, mockRes);
		});
		test('should call errorHelper when it catch any error', async () => {
			const mockReq = mockRequest({
				params: {},
			});
			const mockRes = mockResponse();
			const error = new Error();
			const mockFindAll = jest
				.spyOn(Contest, 'findAll')
				.mockImplementationOnce(() => {
					throw error;
				});
			const mockHandleError = jest.spyOn(queryHelper, 'handleError');

			await ContestController.getContestsByUserId(mockReq, mockRes);

			expect(mockFindAll).toHaveBeenCalledTimes(1);
			expect(mockFindAll).toHaveBeenCalledWith({
				where: { user_id: mockReq.params.userId },
			});
			expect(mockHandleError).toHaveBeenCalledTimes(1);
			expect(mockHandleError).toHaveBeenCalledWith(error, mockRes);
		});
	});
});
