'use strict';
module.exports = {
	up: async (queryInterface, Sequelize, DataTypes) => {
		await queryInterface.createTable('voters', {
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
			voted: {
				type: DataTypes.BOOLEAN
			}
		});
	},
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('voters');
	}
};