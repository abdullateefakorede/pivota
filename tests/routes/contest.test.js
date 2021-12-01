const express = require('express');

describe('Contest Route Test', () => {
	test('', () => {
		const mockRouter = {
			get: jest.fn(),
			post: jest.fn(),
			put: jest.fn(),
			delete: jest.fn()
		};
		jest.spyOn(express, 'Router').mockImplementationOnce(() => mockRouter);

		require('../../src/routes/contest');
        
		expect(mockRouter.get).toHaveBeenNthCalledWith(1, '/host/:userId', expect.any(Function));
		expect(mockRouter.get).toHaveBeenNthCalledWith(2, '/', expect.any(Function));
		expect(mockRouter.get).toHaveBeenNthCalledWith(3, '/:id/candidates', expect.any(Function));
		expect(mockRouter.get).toHaveBeenNthCalledWith(4, '/:id', expect.any(Function));

		expect(mockRouter.put).toHaveBeenNthCalledWith(1, '/:id/vote', expect.any(Function), expect.any(Function));
		expect(mockRouter.put).toHaveBeenNthCalledWith(2, '/:id/join', expect.any(Function), expect.any(Function));
		
		expect(mockRouter.post).toHaveBeenNthCalledWith(1, '/', expect.any(Function), expect.any(Function), expect.any(Function));

		expect(mockRouter.delete).toHaveBeenNthCalledWith(1, '/:id', expect.any(Function), expect.any(Function));
	});
});