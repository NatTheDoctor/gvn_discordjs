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
} = require("../../queries/userQuery");

module.exports = new Event({
  event: "messageCreate",
  once: false,
  run: async (__client__, message, client) => {
    const author = message.author;
    const id = author.id;
    const guild = await client.guilds.fetch(message.guildId);
    const members = await guild.members.fetch();
    console.log(members);
    const user = await fetchUser(id);
    if (user === null) await fetchOrCreateUser(member);
    statsInc(member.id, StatsField.EXP);

    success(user);
  },
}).toJSON();
