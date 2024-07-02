require("dotenv").config();
const fs = require("fs");
const DiscordBot = require("./client/DiscordBot");
const { connect } = require("mongoose");

fs.writeFileSync("./terminal.log", "", "utf-8");
const client = new DiscordBot();

module.exports = client;

client.connect();
console.log(process.env.MONGO_URI);
connect(`${process.env.MONGO_URI}`, {
  connectTimeoutMS: 60000,
}).catch(console.error);
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
