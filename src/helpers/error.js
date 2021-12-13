const responseHelper = require('./response');

exports.handleError = (err, res) => {
	console.error('Error: ', err);
	const msg = typeof err === 'string' ? err : 'SOMETHING_WENT_WRONG';
	return responseHelper.sendErrorResponse(res, {}, msg);
};