const candidateRoute = require('./candidate');
const contestRoute = require('./contest');
const voterRoute = require('./voter');
const userRoute = require('./user');

module.exports = (app) => {
	app.use('/candidate', candidateRoute);
	app.use('/contest', contestRoute);
	app.use('/voter', voterRoute);
	app.use('/user', userRoute);
};