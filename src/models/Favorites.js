const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('favorites', {
        idUser:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        idProduct:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
}