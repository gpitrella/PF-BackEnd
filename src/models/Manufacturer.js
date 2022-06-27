const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('manufacturer', {
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image:{
            type:DataTypes.STRING,
        }
    })
}
