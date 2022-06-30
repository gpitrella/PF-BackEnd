const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('branch_office', {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        direction:{
            type:DataTypes.STRING,
            allowNull: false
        },
        latitude:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        longitude:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
    })
}