'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Voter extends Model {
		/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			// define association here
		}
	}
	Voter.init({
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
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		voter_thumb: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Voter',
		tableName: 'voters',
		timestamps: false
	});
	return Voter;
};