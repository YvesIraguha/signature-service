"use strict";
import { Model, UUIDV4 } from "sequelize";
import TransactionAttributes from "../src/interfaces/transaction";

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
    number!: number;
    deviceId!: string;
    timeOfTransaction!: Date;
    place!: string;
    price!: number;
    currency!: string;
    paymentMethod!: string;
    item!: string;
    id!: string;

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
      timeOfTransaction: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      place: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      currency: { type: DataTypes.STRING, allowNull: false },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
