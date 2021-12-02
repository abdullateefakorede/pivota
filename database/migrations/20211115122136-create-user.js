'use strict';
module.exports = {
	up: async (queryInterface, Sequelize, DataTypes) => {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
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
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			organizationName: {
				type: DataTypes.STRING(255),
				allowNull: false
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false
			},
			role: {
				type: DataTypes.STRING,
				defaultValue: 'coordinator'
			},
			user_thumb: DataTypes.STRING
		});
	},
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('users');
	}
};