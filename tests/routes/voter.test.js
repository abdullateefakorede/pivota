const express = require('express');

describe('Voter Route Test', () => {
	test('Voter Route Test', () => {
		const mockRouter = {
			get: jest.fn(),
			post: jest.fn(),
			delete: jest.fn()
		};
		jest.spyOn(express, 'Router').mockImplementationOnce(() => mockRouter);

		require('../../src/routes/voter');
        
		expect(mockRouter.get).toHaveBeenNthCalledWith(1, '/signout', expect.any(Function));

		expect(mockRouter.post).toHaveBeenNthCalledWith(1, '/signin', expect.any(Function), expect.any(Function));
		expect(mockRouter.post).toHaveBeenNthCalledWith(2, '/signup', expect.any(Function), expect.any(Function));

	});
});