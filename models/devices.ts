'use strict';
import { Model, UUIDV4 } from 'sequelize';
import CreateDeviceInput, { status } from '../src/interfaces/createDevice';

module.exports = (sequelize: any, DataTypes: any) => {
  class Device extends Model<CreateDeviceInput> implements CreateDeviceInput {
    publicKey!: string;
    privateKey!: string;
    signatureAlgorithm!: string;
    transactionDataEncoding!: string;
    numberOfSignedTransactions!: number;
    id!: string;
    description!: string;
    status!: status;
    static associate(models: any) {
      Device.hasMany(models.Transaction, {
        sourceKey: 'id',
        foreignKey: {
          name: 'deviceId'
        },
        as: 'transactions'
      });
    }
  }
  Device.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      description: { type: DataTypes.STRING, allowNull: false },
      publicKey: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      privateKey: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      signatureAlgorithm: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transactionDataEncoding: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numberOfSignedTransactions: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Device'
    }
  );
  return Device;
};
