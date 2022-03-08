"use strict";
import { Model, UUIDV4 } from "sequelize";
import CreateDeviceInput, { status } from "../src/interfaces/createDevice";

module.exports = (sequelize: any, DataTypes: any) => {
  class Device extends Model<CreateDeviceInput> implements CreateDeviceInput {
    certificate!: string;
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
        sourceKey: "id",
        foreignKey: {
          name: "deviceId",
        },
        as: "transactions",
      });
    }
  }
  Device.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      description: { type: DataTypes.STRING, allowNull: false },
      publicKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      certificate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      privateKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      signatureAlgorithm: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionDataEncoding: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberOfSignedTransactions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Device",
    }
  );
  return Device;
};
