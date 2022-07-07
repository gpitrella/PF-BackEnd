const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("branch_office",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      direction: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.REAL,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
