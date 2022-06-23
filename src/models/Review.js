const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('review', {
        score:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        comment:{
            type:DataTypes.STRING
        }
    })}