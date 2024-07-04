const { statsInc, StatsField } = require("../../queries/userQuery");
const { ICON } = require("./ICON");

const case3 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  let random = Math.floor(Math.random() * 100);
  let str = "";
  if (random < 50) {
    str = `, hai đứa ăn hại làm rớt ví\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, -amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, -amount);
  }
  return `đánh hoà với <@${target.userId}> ${str}`;
};

module.exports = { case3 };
