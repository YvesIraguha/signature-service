'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends sequelize_1.Model {
        static associate(models) {
            Transaction.belongsTo(models.Device, {
                foreignKey: {
                    allowNull: false,
                    name: 'deviceId'
                    // type: DataTypes.UUID,
                }
            });
        }
    }
    Transaction.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        deviceId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        timeOfTransaction: {
            type: DataTypes.DATE,
            allowNull: false
        },
        place: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false },
        currency: { type: DataTypes.STRING, allowNull: false },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false
        },
        item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Transaction'
    });
    return Transaction;
};
