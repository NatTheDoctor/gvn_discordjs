require("dotenv").config();
const fs = require("fs");
const DiscordBot = require("./client/DiscordBot");
const { connect } = require("mongoose");
const { success, error } = require("./utils/Console");
const { testSchedule } = require("./utils/scheduleDaily");

fs.writeFileSync("./terminal.log", "", "utf-8");
const client = new DiscordBot();

module.exports = client;

client.connect();
connect("mongodb://nat:24021999@192.168.4.70:27017/nat", {
  connectTimeoutMS: 60000,
})
  .then(() => {
    success("MongoDB connected");
  })
  .catch(error("MongoDB failed to connect"));

testSchedule();

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);
