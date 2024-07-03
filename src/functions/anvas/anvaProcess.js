const { fetchUser, statsInc, StatsField } = require("../../queries/userQuery");

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
  let random = 2; //Math.floor(Math.random() * 6) + 1;
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
      str = "3";
      break;
    case 4:
      str = "4";
      break;
    case 5:
      str = "5";
      break;
    case 6:
      str = "6";
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
  return `đánh ngất <@${target.userId}>, loot tiền\n\`${
    author.userName
  }\`: **+${amount - lossCoin}** ${
    ICON.ICON_COIN
  }\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
};
const case3 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  await statsInc(author.userId, StatsField.COIN, amount);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, amount);
  await statsInc(target.userId, StatsField.EXP, -amount);
  return `đánh ngất <@${target.userId}>, loot tiền\n\`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
};
module.exports = { anvaProcess, ICON, ROLE };
