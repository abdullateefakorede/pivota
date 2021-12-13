const express = require('express');

describe('Candidate Route Test', () => {
	test('Candidate Route Test', () => {
		const mockRouter = {
			get: jest.fn(),
			post: jest.fn(),
			delete: jest.fn()
		};
		jest.spyOn(express, 'Router').mockImplementationOnce(() => mockRouter);

		require('../../src/routes/candidate');
        
		expect(mockRouter.get).toHaveBeenNthCalledWith(1, '/signout', expect.any(Function));

		expect(mockRouter.post).toHaveBeenNthCalledWith(1, '/signin', expect.any(Function), expect.any(Function));
		expect(mockRouter.post).toHaveBeenNthCalledWith(2, '/signup', expect.any(Function), expect.any(Function));

	});
});