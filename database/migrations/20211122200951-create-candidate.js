'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('candidates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type:DataTypes.STRING(45),
        allowNull: false
      },
      lastName: {
        type:DataTypes.STRING(45),
        allowNull: false
      },
      email: {
        type:DataTypes.STRING(45),
        allowNull: false
      },
      nickName: DataTypes.STRING(45),
      password: {
        type:DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type:DataTypes.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contest_id: {
        type:DataTypes.STRING,
        allowNull: false
      },
			vote: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			}
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('candidates');
  }
};