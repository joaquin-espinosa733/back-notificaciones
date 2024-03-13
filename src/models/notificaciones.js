const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
  const TokenModel = sequelize.define(
    "Token",
    {
      token: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timeStamp: true
    }
  );

  // Sincroniza el modelo con la base de datos
  await sequelize.sync();

  return TokenModel;
};
