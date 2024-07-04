const { StatsField, statsInc } = require("../../queries/userQuery");
const { ICON } = require("./ICON");

const case8 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  let lossCoin = Math.floor(Math.random() * amount) + 1;
  await statsInc(author.userId, StatsField.COIN, -amount);
  await statsInc(target.userId, StatsField.COIN, amount - lossCoin);

  await statsInc(author.userId, StatsField.EXP, -amount);
  await statsInc(target.userId, StatsField.EXP, amount - lossCoin);

  let strBaKien = "";
  if (author.isBaKien) {
    strBaKien = `\n\`${author.userName}\` -> ${ICON.ICON_BAKIEN} \`${nickname}\``;
    await exchangeBaKien(author, target);
  }

  return `<@${target.userId}> đánh ngất \`${
    author.userName
  }\`, cướp tiền nhưng làm rớt
    \`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}
    \`${nickname}\`: **+${amount - lossCoin}** ${ICON.ICON_COIN} 
    ${strBaKien}`;
};

module.exports = { case8 };
