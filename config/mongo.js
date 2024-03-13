// db.ts
const { Sequelize } = require('sequelize');
const Token = require('../src/models/notificaciones');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL } = process.env;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL no está definido en el archivo .env');
}

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: false,
});

Token.initialize(sequelize);

module.exports = sequelize;
