'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
		static associate(models) {
			// define association here
			User.hasMany(models.Contest, { foreignKey: 'user_id' });
		}
	}
	User.init({
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
		}
	}, {
		sequelize,
		modelName: 'User',
		tableName: 'users',
		timestamps: false
	});
	return User;
};