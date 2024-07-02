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
    const user = await fetchUser(id);
    if (user === null) {
      console.log("wrong");
    } else {
      console.log(user);
    }
  },
}).toJSON();
