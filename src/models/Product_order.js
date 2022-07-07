const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('product_order', {
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
        description:{
            type: DataTypes.TEXT,
        }
    })}