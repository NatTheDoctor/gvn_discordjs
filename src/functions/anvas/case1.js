const { statsInc, StatsField } = require("../../queries/userQuery");
const { ICON } = require("./ICON");
const { exchangeBaKien } = require("./anvaProcess");

const case1 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  await statsInc(author.userId, StatsField.COIN, amount);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, amount);
  await statsInc(target.userId, StatsField.EXP, -amount);

  let strBaKien = "";
  if (author.isBaKien) {
    strBaKien = `\`${nickname}\` -> ${ICON.ICON_BAKIEN} \`${author.userName}\``;
    await exchangeBaKien(target, author);
  }

  return `đánh ngất <@${target.userId}>, loot tiền
  \`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}
  ${nickname}: **-${amount}** ${ICON.ICON_COIN}
  ${strBaKien}`;
};

module.exports = { case1 };
