require('dotenv').config();

module.exports = {
	port: process.env.PORT || 4005,
	secret: process.env.SECRET,
	db: {
		mysql:{
			name: process.env.DB_NAME,
			port: process.env.DB_PORT,
			host: process.env.DB_HOST,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD			
		}
	}
};