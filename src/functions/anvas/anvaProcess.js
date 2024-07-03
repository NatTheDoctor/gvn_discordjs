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
  let random = 1; //Math.floor(Math.random() * 6) + 1;
  if (members.length > 1) {
    secondTarget = await fetchUser(members[1]);
  }
  switch (random) {
    case 1: //Author win, firstTarget mất tiền
      str = case1(author, firstTarget, amount);
      break;
    case 2:
      str = "2";
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

  console.log(target);
  await statsInc(author.id, StatsField.COIN, -amount);
  await statsInc(target.id, StatsField.COIN, -amount);
  console.log(target);
  return `<@${target.userId}> ăn đấm, ngất tại chỗ, mất tiền\n\`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
};

module.exports = { anvaProcess, ICON, ROLE };
