// const db = require("./database/models")
const express = require('express');
const morgan = require('morgan');

const config = require('./src/config/config');
const registerRoutes  = require('./src/routes/register');

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

app.listen(config.port, function() {
	// db.sequelize.sync()
	console.log(`Driver service is running on ${config.port}`);
});

module.exports = app;