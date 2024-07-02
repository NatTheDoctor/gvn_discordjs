const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");
const {
  fetchOrCreateMessage,
  getAllMessage,
} = require("../../queries/messageQuery");

module.exports = new Event({
  event: "messageCreate",
  once: false,
  run: (__client__, message) => {
    fetchOrCreateMessage(message);
    console.log(getAllMessage());
  },
}).toJSON();
