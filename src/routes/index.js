const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const Token = require("../models/notificaciones");

const serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


router.post('/save-token', async (req, res) => {
    try {
        const { token } = req.body;
        console.log("token-------- :", token);

        // Buscar si ya existe un token con el mismo valor
        const existingToken = await Token.findOne({ where: { token: token } });

        // Si el token ya existe, no lo guardes de nuevo
        if (existingToken) {
            console.log('Token already exists:', token);
            return res.status(200).send('Token already exists');
        }

        // Si el token no existe, guárdalo en la base de datos
        await Token.create({ token: token });
        res.status(200).send('Token saved successfully');
    } catch (error) {
        console.error('Error saving token:', error);
        res.status(500).send('Error saving token');
    }
});




router.post('/send-notification', async (req, res) => {
    try {
        const { title, body } = req.body;

        // Obtener todos los tokens de la base de datos
        const tokens = await Token.findAll({ attributes: ['token'] });

        // Crear la notificación
        const message = {
            notification: {
                title: title,
                body: body,
            },
            tokens: tokens.map(token => token.token),
        };

        // Enviar la notificación
        const response = await admin.messaging().sendMulticast(message);

        // Manejar la respuesta
        console.log('Successfully sent notification:', response);

        // Eliminar los tokens fallidos de la base de datos
        response.responses.forEach(async (response, index) => {
            if (!response.success) {
                const tokenToDelete = tokens[index];
                await Token.destroy({ where: { token: tokenToDelete.token } });
                console.log('Deleted token:', tokenToDelete.token);
            }
        });
        res.status(200).send('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
    }
});



module.exports = router;