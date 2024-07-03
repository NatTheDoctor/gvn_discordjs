const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");
const moment = require("moment");
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
  removeAllUsers,
  isDebuff,
} = require("../../queries/userQuery");

const random = Math.floor(Math.random() * 3);

module.exports = new Event({
  event: "messageCreate",
  once: false,
  run: async (__client__, message) => {
    const startTime = performance.now();
    const author = message.author;
    const id = author.id;
    const guild = message.guild;
    const member = await guild.members.fetch(id);

    const user = await fetchUser(id);
    if (user === null) {
      return await fetchOrCreateUser(member);
    }
    await fetchOrCreateMessage(message, user);
    var status = await isDebuff(id);
    await statsInc(member.id, StatsField.EXP, random);
    await statsInc(member.id, StatsField.COIN, random);

    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(1);
    success(
      `[${message.channel.name} ${user.userName} (${status}): coin ${user.coin}, exp ${user.exp} ${executionTime} ms`
    );
  },
}).toJSON();
