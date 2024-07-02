require("dotenv").config();
const fs = require("fs");
const DiscordBot = require("./client/DiscordBot");
const { connect } = require("mongoose");
const { success, error } = require("./utils/Console");

fs.writeFileSync("./terminal.log", "", "utf-8");
const client = new DiscordBot();

module.exports = client;

client.connect();
connect(process.env.MONGO_URI, {
  connectTimeoutMS: 60000,
})
  .then(() => {
    success("MongoDB connected");
  })
  .catch(error("MongoDB failed to connect"));
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
