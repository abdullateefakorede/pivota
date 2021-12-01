'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Candidate extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	Candidate.init({
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
		vote: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		contest_id: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	}, {
		sequelize,
		modelName: 'Candidate',
		tableName: 'candidates',
		timestamps: false,
		indexes: [
			{
				unique: false,
				fields: ['contest_id']
			}
		]
	});
	return Candidate;
};