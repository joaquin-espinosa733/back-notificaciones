const { DataTypes, Model, Sequelize } = require('sequelize');

class Token extends Model {
    static initialize(sequelize) {
        Token.init(
            {
                token: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },

            },
            {
                sequelize,
                tableName: 'tokens'
            }
        );
    }
}

module.exports = Token;
