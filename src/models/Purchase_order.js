const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('purchase_order', {
        status:{
            type:DataTypes.ENUM('pending','processing','cancelled','sending','filled'),
            allowNull: false,
            defaultValue: 'pending'
        },
        totalpurchase: {
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        idMP: {
            type:DataTypes.STRING
        },
        items: {
            type: DataTypes.ARRAY(DataTypes.JSON),
        }
    })}
