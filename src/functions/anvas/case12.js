const {
  fetchBaKien,
  statsInc,
  StatsField,
} = require("../../queries/userQuery");
const { ICON } = require("./ICON");

const case12 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let chance = Math.floor(Math.random() * 100);
  let str = "";
  if (chance < 35) {
    str += `rớt tiền\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, -amount);
    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, -amount);
  }
  let baKien = await fetchBaKien();
  return `đang đấm <@${target.userId}> thì ${ICON.ICON_BAKIEN} \`${baKien.userName}\` cầm dép đi ngang, hai tên bị hù chạy ${str}`;
};

module.exports = { case12 };
