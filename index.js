const express = require('express')
const db = require("./config/mongo")
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 3000

const corsOptions = {
    origin: '*', // Reemplaza con la URL de tu cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.json())
app.use(morgan("dev"))
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin, same-origin-allow-popups');
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


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