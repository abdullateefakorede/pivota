const config = require('../../src/config/config');
const dbConfig = {
	username: config.db.mysql.username,
	password: config.db.mysql.password,
	database: config.db.mysql.name,
	host: config.db.mysql.host,
	port: config.db.mysql.port,
	dialect: 'mysql'
};
module.exports = {
	development: dbConfig,
	staging: dbConfig,
	test: dbConfig,
	production: dbConfig
};