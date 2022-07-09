const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('comments', {
        comment:{
            type:DataTypes.TEXT,
        },
        date:{
            type:DataTypes.DATEONLY,
        },
        answer:{
            type:DataTypes.TEXT
        },
        viewed:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
}