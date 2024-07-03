const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");
const { fetchOrCreateMessage } = require("../../queries/messageQuery");
const {
  fetchUser,
  fetchOrCreateUser,
  statsInc,
  StatsField,
  isDebuff,
  StatusField,
  decreaseDebuffCount,
} = require("../../queries/userQuery");

const random = Math.floor(Math.random() * 3);
const cooldownMap = new Map();

module.exports = new Event({
  event: "messageCreate",
  once: false,
  run: async (__client__, message) => {
    if (message.author.bot) return;
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
    if (status) {
      const now = Date.now();
      const cooldownTime = 60 * 1000; // 1 minute
      const lastExecutionTime = cooldownMap.get(id);
      if (lastExecutionTime && now - lastExecutionTime < cooldownTime) {
        return; // cooldown not expired, skip execution
      }
      await decreaseDebuffCount(id, -1);
      cooldownMap.set(id, now); // update last execution time
    }
    await changeNameByStatus(user, member);
    await statsInc(member.id, StatsField.EXP, random);
    await statsInc(member.id, StatsField.COIN, random);

    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(1);
    success(
      `${message.channel.name} ${user.userName} (${status}): coin ${user.coin}, exp ${user.exp} ${executionTime} ms`
    );
  },
}).toJSON();

const changeNameByStatus = async (user, member) => {
  const status = user.status;
  const nickname = member.nickname;
  const userName = user.userName;

  let cleanNickname = nickname;
  if (nickname !== null) {
    // Remove any existing icons from the nickname
    cleanNickname = nickname.replace(
      /[\uD83D\uDC51\uD83E\uDD21\uD83D\uDEB7]/g,
      ""
    );
  }

  const newNickname =
    [
      user.isBaKien ? "\uD83D\uDC51" : "",
      status[StatusField.DECEASED] ? "👻" : "",
      status[StatusField.PARANOID] ? "\uD83E\uDD21" : "",
      status[StatusField.CAPTIVE] ? "\uD83D\uDEB7" : "",
    ]
      .filter((icon) => icon !== "")
      .join("") + cleanNickname;

  if (nickname !== newNickname) {
    member.setNickname(newNickname).then(console.log("success"));
  }
};
