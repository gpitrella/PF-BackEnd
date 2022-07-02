const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('favorites', {
        idUser:{
            type:DataTypes.STRING,
            allowNull:false
        },
        idProduct:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}