const { DataTypes, Model, Sequelize } = require('sequelize');

class Token extends Model {
    static initialize(sequelize) {
        Token.init(
            {
                token: {
                    type: DataTypes.STRING,
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
