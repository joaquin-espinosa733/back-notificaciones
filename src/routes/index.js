const express = require("express");
const router = express.Router();

// Array para almacenar los tokens
let tokens = [];

router.post('/save-token', async (req, res) => {
    try {
        const { token } = req.body;
        console.log("token-------- :", token);

        // Buscar si ya existe un token con el mismo valor
        const existingToken = tokens.find(t => t === token);

        // Si el token ya existe, no lo guardes de nuevo
        if (existingToken) {
            console.log('Token already exists:', token);
            return res.status(200).send('Token already exists');
        }

        // Si el token no existe, guárdalo en el array
        tokens.push(token);
        res.status(200).send('Token saved successfully');
    } catch (error) {
        console.error('Error saving token:', error);
        res.status(500).send('Error saving token');
    }
});

router.post('/send-notification', async (req, res) => {
    try {
        const { title, body } = req.body;

        // Crear la notificación
        const message = {
            notification: {
                title: title,
                body: body,
            },
            tokens: tokens,
        };

        // Enviar la notificación utilizando FCM
        const response = await admin.messaging().sendMulticast(message);

        // Manejar la respuesta
        console.log('Successfully sent notification:', response);

        res.status(200).send('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
    }
});

module.exports = router;
