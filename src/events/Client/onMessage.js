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
  StatusField,
} = require("../../queries/userQuery");

const random = Math.floor(Math.random() * 3);

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
      changeNameByStatus(user, member);
    }
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
  if (status[StatusField.DECEASED]) {
    if (!nickname?.startsWith("👻")) {
      member.setNickname(`👻${user.userName}`).then(console.log("success"));
    }
  } else {
    if (nickname?.startsWith("👻")) {
      console.log(user);
      member.setNickname(`${user.userName}`).then(console.log("success"));
    }
  }
};

/*
	public static final String iconDeath = "👻";
	public static final String iconCrazy = "\uD83E\uDD21";
	public static final String iconJail = "\uD83D\uDEB7";
	public static final String iconBaKien = "\uD83D\uDC51";
	private static final String iconJail = "<a:tunhan:1255444756729692210>";
	private static final String iconParanoid = "<a:cogiat:1255445604235083806>";
	private static final String iconDeceased = "<a:chet:1255446300942401646>";
	private static final String iconCoin = "<:notcoin:988449419621990470>";
	private static final String roleBaKien = "1242495746952007781";
*/
