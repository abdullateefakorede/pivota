global._language = 'en';

const Language = require('@shypes/language-translator');
Language._({
	__basedir: process.env.PWD,
	langFolder: 'src/lang/responses'
});

exports.sendErrorResponse = async (res, content, message, status) => {
	status = !status ? 400 : status;
	let responseData = { 'message' : '', 'param' : '' };

	if (typeof message == 'string') {
		responseData['message'] = message;
		message = {};
	}

	responseData = { ...responseData, ...message };
	Language.setActiveLang(_language);
	Language.setLanguageDir('src/lang/responses');

	let translated = await Language.get(responseData['message'], res.language, responseData['param']);
	let langKey = !(res.langKey == 'true' || res.langKey == '1') ? false : true;
	let responseKey = {
		'data': langKey ? Language.text('DATA') : 'data',
		'message': langKey ? Language.text('MESSAGE') : 'message',
		'success': langKey ? Language.text('SUCCESS') : 'success'
	};

	let data = {};
	data[responseKey['success']] = false;
	data[responseKey['message']] = translated;
	data[responseKey['data']] = content;

	res.status(status).json(data);
};

exports.sendSuccessResponse = async (res, content, message) => {
	let responseData = { 'message' : '', 'param' : '' };

	if (typeof message == 'string') {
		responseData['message'] = message;
		message = {};
	}

	responseData = {...responseData, ...message};
	Language.setActiveLang(_language);
	Language.setLanguageDir('src/lang/responses');

	let translated = await Language.get(responseData['message'], res.language, responseData['param']);
	let langKey = !(res.langKey == 'true' || res.langKey == '1') ? false : true;
	let responseKey = {
		'data': langKey ? Language.text('DATA') : 'data',
		'message': langKey ? Language.text('MESSAGE') : 'message',
		'success': langKey ? Language.text('SUCCESS') : 'success'
	};

	let data = {};
	data[responseKey['success']] =  true;
	data[responseKey['message']] =  translated;
	data[responseKey['data']] =  content;

	res.status(200).json(data);
};