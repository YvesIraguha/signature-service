'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Device extends sequelize_1.Model {
        static associate(models) {
            Device.hasMany(models.Transaction, {
                sourceKey: 'id',
                foreignKey: {
                    name: 'deviceId'
                },
                as: 'transactions'
            });
        }
    }
    Device.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
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
    }, {
        sequelize,
        modelName: 'Device'
    });
    return Device;
};
