const { success, channel } = require("../../utils/Console");
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
const { scheduleDaily } = require("../../utils/scheduleDaily");
const { ICON } = require("../../functions/anvas/ICON");

const random = Math.floor(Math.random() * 2) + 1;
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
      if (user.status.isCaptive) {
        await decreaseDebuffCount(id, -1);
      } else {
        const now = Date.now();
        const cooldownTime = 60 * 1000; // 1 minute
        const lastExecutionTime = cooldownMap.get(id);
        if (lastExecutionTime && now - lastExecutionTime < cooldownTime) {
          return; // cooldown not expired, skip execution
        }
        await decreaseDebuffCount(id, -1);
        cooldownMap.set(id, now); // update last execution time
      }
    }
    await changeNameByStatus(user, member);
    await statsInc(member.id, StatsField.EXP, random);
    await statsInc(member.id, StatsField.COIN, random);
    addRoleByStatus(user, member);
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(1);
    channel(
      `#${message.channel.name}`,
      `${user.userName} (${status}): ${executionTime} ms`
    );
  },
}).toJSON();

const changeNameByStatus = async (user, member) => {
  if (user.userId === "147044666972307456") return;
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

  const icons = [
    user.isBaKien ? ICON.ICON_BAKIEN : "",
    status[StatusField.DECEASED] ? ICON.ICON_DECEASED : "",
    status[StatusField.PARANOID] ? ICON.ICON_PARANOID : "",
    status[StatusField.CAPTIVE] ? ICON.ICON_CAPTIVE : "",
  ].filter((icon) => icon !== "");

  let newNickname = icons.join("") + cleanNickname;

  // Truncate nickname if it exceeds 32 characters
  if (newNickname.length > 32) {
    const iconLength = icons.join("").length;
    const maxNicknameLength = 32 - iconLength;
    cleanNickname = cleanNickname.substring(0, maxNicknameLength);
    newNickname = icons.join("") + cleanNickname;
  }

  scheduleDaily.start();

  if (nickname !== newNickname) {
    member
      .setNickname(newNickname)
      .then(success(`changeNameByStatus() - Updated name ${userName}`));
  }
};

const addRoleByStatus = async (user, member) => {
  //1242495746952007781
  if (user.isBaKien) {
    if (!member.roles.cache.some((role) => role.name === "Bá Kiến")) {
      var role = member.guild.roles.cache.find(
        (role) => role.name === "Bá Kiến"
      );
      member.roles.add(role);
    }
  } else if (!user.isBaKien) {
    if (member.roles.cache.some((role) => role.name === "Bá Kiến")) {
      var role = member.guild.roles.cache.find(
        (role) => role.name === "Bá Kiến"
      );
      member.roles.remove(role);
    }
  }
};

const reactToMessage = (message) => {};
