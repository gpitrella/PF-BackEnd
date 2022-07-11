const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('purchase_order', {
        status:{
            type:DataTypes.ENUM('pending','processing','cancelled','sending','filled'),
            allowNull: false
        },
        total:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        idMP: {
            type:DataTypes.STRING
        },
        items: {
            type: DataTypes.ARRAY(DataTypes.JSON),
        },
        totalpurchase: {
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })}