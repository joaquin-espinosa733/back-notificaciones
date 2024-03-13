// db.ts
const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL } = process.env;

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL no está definido en el archivo .env');
}

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: false,
});

const TokenModel = require('../src/models/notificaciones')(sequelize);

// Sincronizar el modelo con la base de datos
(async () => {
    try {
        // Verificar si la tabla ya existe
        const existeTabla = await sequelize.getQueryInterface().showAllTables().then(tables => {
            return tables.includes('Tokens');
        });

        // Si la tabla no existe, entonces sincronizar
        if (!existeTabla) {
            await sequelize.sync();
            console.log('Base de datos conectada y sincronizada');
        } else {
            console.log('La tabla Tokens ya existe en la base de datos');
        }
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
})();

module.exports = sequelize;
