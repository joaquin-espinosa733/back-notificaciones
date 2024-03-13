require("dotenv/config");
const { connect } = require("mongoose");

async function dbConnect() {
    const DB_URI = process.env.DB_URI;
    await connect(DB_URI);
}

module.exports = dbConnect;