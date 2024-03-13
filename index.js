const express = require('express')
const db = require("./config/mongo")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 3000

const corsOptions = {
    origin: '*', // Reemplaza con la URL de tu cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(express.json())
app.use(morgan("dev"))
app.use(cors(corsOptions));



app.get("/", (req, res) => {
    const htmlResponse =
        `<html>
        <head>
          <title>Node.js y express</title>
        </head>
        <body>
          <h1>Proyecto levantado</h1>
        </body>
      </html>`
    res.send(htmlResponse);
});

app.use(require("./src/routes/index"));

db().then(() => console.log("conexion ready"));
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
)