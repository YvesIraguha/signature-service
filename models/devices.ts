"use strict";
import { Model, UUIDV4 } from "sequelize";

interface DeviceAttributes {
  id: string;
  publicKey: string;
  label: string;
  signedTransactions: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Device extends Model<DeviceAttributes> implements DeviceAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    publicKey!: string;
    label!: string;
    signedTransactions!: number;
    static associate(models: any) {
      Device.hasMany(models.Transaction, {
        sourceKey: "id",
        foreignKey: {
          name: "deviceId",
          // type: DataTypes.UUID,
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
      label: { type: DataTypes.STRING, allowNull: false },
      publicKey: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      signedTransactions: {
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
