const mongoose = require('mongoose');

// Define el esquema para el token de notificación
const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Crea el modelo Token basado en el esquema
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
