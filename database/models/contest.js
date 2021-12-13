'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Contest extends Model {
		/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
		static associate(models) {
			// define association here
			Contest.hasOne(models.Candidate, { foreignKey: 'contest_id'});
		}
	}
	Contest.init({
		contestName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		totalContestant: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		maxNoOfContestant: DataTypes.INTEGER,
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		totalVote: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		contest_thumb: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Contest',
		tableName: 'contests',
		timestamps: false,
		indexes: [
			{
				unique: false,
				fields: ['user_id']
			}
		]
	});
	return Contest;
};