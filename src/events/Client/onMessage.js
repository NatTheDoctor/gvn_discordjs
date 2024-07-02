const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");
const {
  fetchOrCreateMessage,
  getAllMessage,
} = require("../../queries/messageQuery");
const { fetchUser } = require("../../queries/userQuery");

module.exports = new Event({
  event: "messageCreate",
  once: false,
  run: async (__client__, message) => {
    const author = message.author;
    const id = author.id;
    if (fetchUser(id) === null) {
      console.log("wrong");
    } else {
      console.log(fetchUser(id));
    }
  },
}).toJSON();
