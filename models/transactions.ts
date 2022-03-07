"use strict";
import { Model, UUIDV4 } from "sequelize";

interface TransactionAttributes {
  id: string;
  deviceId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Transaction
    extends Model<TransactionAttributes>
    implements TransactionAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    deviceId!: string;

    static associate(models: any) {
      Transaction.belongsTo(models.Device, {
        foreignKey: {
          allowNull: false,
          name: "deviceId",
          // type: DataTypes.UUID,
        },
      });
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      deviceId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
