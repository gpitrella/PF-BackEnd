const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('purchase_order', {
        status:{
            type:DataTypes.ENUM('pending','cancelled','filled'),
            allowNull: false
        },
        total:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        sucursal:{
            type: DataTypes.TEXT
        },
        description:{
            type: DataTypes.TEXT
        },
        idMP: {
            type:DataTypes.STRING
        },
        items: {
            type: DataTypes.ARRAY(DataTypes.JSON),
        }
    })}