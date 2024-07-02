require("dotenv").config();
const fs = require("fs");
const DiscordBot = require("./client/DiscordBot");
const { connect } = require("mongoose");

fs.writeFileSync("./terminal.log", "", "utf-8");
const client = new DiscordBot();

module.exports = client;

client.connect();
connect("mongodb://nat:123@192.168.4.70:27017/nat");
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
