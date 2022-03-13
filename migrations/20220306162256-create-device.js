'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      description: { type: Sequelize.STRING, allowNull: false },
      publicKey: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      privateKey: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      signatureAlgorithm: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transactionDataEncoding: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numberOfSignedTransactions: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};
