const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('manufacturer', {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        image:{
            type:DataTypes.STRING,
        }
    })
}
