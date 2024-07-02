const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");
const {
  fetchOrCreateMessage,
  getAllMessage,
} = require("../../queries/messageQuery");
const {
  fetchUser,
  fetchOrCreateUser,
  statsInc,
  StatsField,
  fetchAllUsers,
} = require("../../queries/userQuery");

module.exports = new Event({
  event: "messageCreate",
  once: false,
  run: async (__client__, message) => {
    const author = message.author;
    const id = author.id;
    const guild = message.guild;
    const member = await guild.members.fetch(id);
    const user = await fetchUser(id);
    if (user === null) {
      await fetchOrCreateUser(member);
    }

    console.log(await fetchAllUsers());

    statsInc(member.id, StatsField.EXP);

    success(user);
  },
}).toJSON();
