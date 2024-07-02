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
  removeAllUsers,
  isDebuff,
} = require("../../queries/userQuery");

module.exports = new Event({
  event: "messageCreate",
  once: false,
  run: async (__client__, message) => {
    const author = message.author;
    const id = author.id;
    const guild = message.guild;
    const member = await guild.members.fetch(id);

    await fetchOrCreateMessage(message);

    const user = await fetchUser(id);
    if (user === null) {
      return await fetchOrCreateUser(member);
    }
    await statsInc(member.id, StatsField.EXP, 1);
    await statsInc(member.id, StatsField.COIN, 1);

    if (isDebuff(id)) {
      success("false");
    } else {
      success("true");
    }
    success(
      `${message.channel.name} ${user.userName}: coin ${user.coin}, exp ${user.exp}`
    );
  },
}).toJSON();
