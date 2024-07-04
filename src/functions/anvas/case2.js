const { statsInc, StatsField } = require("../../queries/userQuery");
const { ICON } = require("./ICON");
const { exchangeBaKien } = require("./anvaProcess");

const case2 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  let lossCoin = Math.floor(Math.random() * amount) + 1;
  await statsInc(author.userId, StatsField.COIN, amount - lossCoin);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, amount);
  await statsInc(target.userId, StatsField.EXP, -amount);
  let strBaKien = "";
  if (author.isBaKien) {
    strBaKien = `\`${nickname}\` -> ${ICON.ICON_BAKIEN} \`${author.userName}\``;
    await exchangeBaKien(target, author);
  }
  return `đấm <@${target.userId}> bầm dập, loot thì ít mà rớt thì nhiều
  \`${author.userName}\`: **+${amount - lossCoin}** ${ICON.ICON_COIN}
  ${nickname}: **-${amount}** ${ICON.ICON_COIN}
  ${strBaKien}`;
};

module.exports = { case2 };
