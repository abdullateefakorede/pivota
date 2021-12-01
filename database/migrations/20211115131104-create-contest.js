'use strict';
module.exports = {
	up: async (queryInterface, Sequelize, DataTypes) => {
		await queryInterface.createTable('contests', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			contestName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			completed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			maxNoOfContestant: DataTypes.INTEGER,
			totalContestant: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			totalVote: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			user_id: {
				type: DataTypes.INTEGER
			}
		});
	},
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('contests');
	}
};