'use strict';
module.exports = {
	// eslint-disable-next-line no-unused-vars
	up: async (queryInterface, Sequelize, DataTypes) => {
		await queryInterface.createTable('candidates', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			firstName: {
				type: DataTypes.STRING(45),
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING(45),
				allowNull: false
			},
			email: {
				type: DataTypes.STRING(45),
				allowNull: false
			},
			nickName: DataTypes.STRING(45),
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false
			},
			dateOfBirth: {
				type: DataTypes.STRING,
				allowNull: false
			},
			contest_id: {
				type: DataTypes.STRING,
				allowNull: false
			},
			vote: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			}
		});
	},
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('candidates');
	}
};