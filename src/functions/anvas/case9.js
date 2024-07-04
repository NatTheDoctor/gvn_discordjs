const { statsInc, StatsField } = require("../../queries/userQuery");
const { ICON } = require("./anvaProcess");

const case9 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let str = "";
  let chance = Math.floor(Math.random() * 100);
  if (chance < 50) {
    str = `, phạt cả hai tội gây rối nơi công cộng
    \`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}
    \`${nickname}\`: **-${amount}** ${ICON.ICON_COIN}`;
  }
  await statsInc(author.userId, StatsField.COIN, -amount);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, -amount);
  await statsInc(target.userId, StatsField.EXP, -amount);

  return `<@${target.userId}> đánh hoà \`${author.userName}\` ${str}`;
};

module.exports = { case9 };
