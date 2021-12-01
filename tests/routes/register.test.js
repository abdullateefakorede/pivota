const express = require('express');
const app = express();

describe('Register Route Test', () => {
	test('', () => {
		const mockApp = {
			use: jest.fn()
		};
		jest.spyOn(app, 'use').mockImplementationOnce(() => mockApp);

		require('../../src/routes/register')(mockApp);
        
		expect(mockApp.use).toHaveBeenNthCalledWith(1, '/candidate', expect.any(Function));
		expect(mockApp.use).toHaveBeenNthCalledWith(2, '/contest', expect.any(Function));
		expect(mockApp.use).toHaveBeenNthCalledWith(3, '/voter', expect.any(Function));
		expect(mockApp.use).toHaveBeenNthCalledWith(4, '/user', expect.any(Function));

	});
});