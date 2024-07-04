const { StatsField, statsInc } = require("../../queries/userQuery");
const { ICON } = require("./anvaProcess");

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

module.exports = { case5 };
