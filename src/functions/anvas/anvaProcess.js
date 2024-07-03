const {
  fetchUser,
  statsInc,
  StatsField,
  setDebuff,
  StatusField,
} = require("../../queries/userQuery");

const ICON = {
  ICON_BAKIEN: "\uD83D\uDC51",
  ICON_DECEASED: "👻",
  EMO_DECEASED: "<a:chet:1255446300942401646>",
  ICON_PARANOID: "\uD83E\uDD21",
  EMO_PARANOID: "<a:cogiat:1255445604235083806>",
  ICON_CAPTIVE: "\uD83D\uDEB7",
  EMO_CAPTIVE: "<a:tunhan:1255444756729692210>",
  ICON_COIN: "<:notcoin:988449419621990470>",
};

const ROLE = {
  BAKIEN: "1242495746952007781",
};

const anvaProcess = async (author, members) => {
  let firstTarget = await fetchUser(members[0]);
  let secondTarget = null;
  let str = "";
  let amount = 2;
  let random = 6; //Math.floor(Math.random() * 6) + 1;
  if (members.length > 1) {
    secondTarget = await fetchUser(members[1]);
  }
  switch (random) {
    case 1: //Author win, firstTarget mất tiền
      str = case1(author, firstTarget, amount);
      break;
    case 2:
      str = case2(author, firstTarget, amount);
      break;
    case 3:
      str = case3(author, firstTarget, amount);
      break;
    case 4:
      str = case4(author, firstTarget, amount);
      break;
    case 5:
      str = case5(author, firstTarget, amount);
      break;
    case 6:
      str = case6(author, firstTarget, amount);
      break;
    case 7:
      str = "7";
      break;
  }
  return str;
};

const case1 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  await statsInc(author.userId, StatsField.COIN, amount);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, amount);
  await statsInc(target.userId, StatsField.EXP, -amount);
  return `đánh ngất <@${target.userId}>, loot tiền\n\`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
};
const case2 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  let lossCoin = Math.floor(Math.random() * amount);
  await statsInc(author.userId, StatsField.COIN, amount - lossCoin);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, amount);
  await statsInc(target.userId, StatsField.EXP, -amount);
  return `đấm <@${target.userId}> bầm dập, loot thì ít mà rớt thì nhiều\n\`${
    author.userName
  }\`: **+${amount - lossCoin}** ${
    ICON.ICON_COIN
  }\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
};
const case3 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  let random = Math.floor(Math.random() * 100);
  let str = "";
  if (random < 50) {
    str = `hai đứa ăn hại làm rớt ví\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, -amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, -amount);
  }
  return `đánh hoà với <@${target.userId}>,${str}`;
};
const case4 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let authorChance = Math.floor(Math.random() * 100);
  let targetChance = Math.floor(Math.random() * 100);
  let str = "";
  if (authorChance <= 50) {
    str += `\n\`${author.userName}\`: ${ICON.EMO_DECEASED}`;
    await setDebuff(author.userId, StatusField.DECEASED, true);
  } else {
    str += `\n\`${author.userName}\`: ${ICON.EMO_PARANOID}`;
    await setDebuff(author.userId, StatusField.PARANOID, true);
  }

  if (targetChance <= 50) {
    str += `\n\`${nickname}\`: ${ICON.EMO_DECEASED}`;
  } else {
    str += `\n\`${nickname}\`: ${ICON.EMO_PARANOID}`;
  }
  return `đấm <@${target.userId}> giường chiếu rung chuyển, hai đứa thượng mã phong, không biết điên chết ${str}`;
};

const case5 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let chance = Math.floor(Math.random() * 100);
  let str = "";
  if (chance <= 50) {
    str = `còn nhặt được tiền dưới đất.
    \`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}
    \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;

    await statsInc(author.userId, StatsField.COIN, amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, amount);
    await statsInc(target.userId, StatsField.EXP, amount);
  }
  return `vừa gặp <@${target.userId}> đã yêu, hai bên ôm nhau thắm thiết ra về `;
};

const case6 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let chance = Math.floor(Math.random() * 100);
  chance = 99;
  if (chance <= 33) {
    str = "vào hòm";
    await setDebuff(target.userId, StatusField.DECEASED, true);
  } else if (chance <= 67) {
    str = "vào trại thương điên";
    await setDebuff(target.userId, StatusField.PARANOID, true);
  } else {
    str = "vào tù";
    await setDebuff(target.userId, StatusField.CAPTIVE, true);
  }
  return `hoá chaos tiễn <@${target.userId}> ${str}`;
};

const case7 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let chance = Math.floor(Math.random() * 100);
  let str = "";
  if (chance <= 50) {
    str = `còn nhặt được tiền dưới đất.
    \`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}
    \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;

    await statsInc(author.userId, StatsField.COIN, amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, amount);
    await statsInc(target.userId, StatsField.EXP, amount);
  }
  return `vừa gặp <@${target.userId}> đã yêu, hai bên ôm nhau thắm thiết ra về `;
};
module.exports = { anvaProcess, ICON, ROLE };
