const { DataTypes, Model, Sequelize } = require('sequelize');

class Token extends Model {
    static initialize(sequelize) {
        Token.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                token: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            }, {
            sequelize,
            modelName: 'Token',
            tableName: 'tokens'
        }
        );
    }
}

module.exports = Token;
