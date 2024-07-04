const {
  setDebuff,
  StatusField,
  statsInc,
  StatsField,
} = require("../../queries/userQuery");
const { ICON } = require("./anvaProcess");

const case10 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let str = "";
  let chance = Math.floor(Math.random() * 100);
  if (chance < 33) {
    chance = Math.floor(Math.random() * 100);
    if (chance < 50) {
      str = `trượt chân té chết
    \`${author.userName}\`: hihi
    \`${nickname}\`: ${ICON.EMO_DECEASED}`;
      await setDebuff(target.userId, StatusField.DECEASED, true);
    } else {
      str = `trượt chân té không chết nhưng u não
    \`${author.userName}\`: hihi
    \`${nickname}\`: ${ICON.EMO_PARANOID}`;
      await setDebuff(target.userId, StatusField.PARANOID, true);
    }
  } else if (chance < 67) {
    str = `bị \`${author.userName}\` túm lại thông toác đuýt, bị cướp tiền viện phí, ném dưới gầm cầu Vũ Đại
    \`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}
    \`${nickname}\`: **-${amount}** ${ICON.ICON_COIN}`;
    await statsInc(author.userId, StatsField.COIN, amount);
    await statsInc(target.userId, StatsField.COIN, -amount);

    await statsInc(author.userId, StatsField.EXP, amount);
    await statsInc(target.userId, StatsField.EXP, -amount);
  } else {
    let subStr = "";
    chance = Math.floor(Math.random() * 100);
    if (chance <= 50) {
      subStr = `chết \`${author.userName}\`, lột tiền`;
      subStr += `\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}, ${ICON.EMO_DECEASED}
      \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;
      await setDebuff(author.userId, StatusField.DECEASED, true);
    } else {
      subStr = `ngất \`${author.userName}\`, lột tiền`;
      subStr += `\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}
      \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;
    }
    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, amount);

    str = `nhặt được bí kíp, bùng nổ bách vạn thần quyền, đấm ${subStr}`;
  }

  return `<@${target.userId}> chạy thoát nhưng ${str}`;
};

module.exports = { case10 };
