const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('purchase_order', {
        status:{
            type:DataTypes.ENUM('pending','cancelled','filled'),
            allowNull: false
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },
        unit_price:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    })}