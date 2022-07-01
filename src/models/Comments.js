const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('comments', {
        comment:{
            type:DataTypes.TEXT,
            allowNull: false
        },
        date:{
            type:DataTypes.DATEONLY,
        }
    })
}