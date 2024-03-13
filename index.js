const express = require('express')
const db = require("./config/mongo")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 3000


app.get('/', (req, res) =>
    res.send('Hello World!')
);

app.use(express.json())
app.use(morgan("dev"))
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'));

app.use(require("./src/routes/index"));

db().then(() => console.log("conexion ready"));
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
)