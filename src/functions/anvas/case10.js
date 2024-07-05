const {
  setDebuff,
  StatusField,
  statsInc,
  StatsField,
} = require("../../queries/userQuery");
const { ICON } = require("./ICON");

const case10 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let str = "";
  let chance = Math.floor(Math.random() * 100);
  if (chance < 33) {
    chance = Math.floor(Math.random() * 100);
    if (chance < 50) {
      let debuffAmount = await setDebuff(
        target.userId,
        StatusField.DECEASED,
        true
      );
      str = `trượt chân té chết\n\`${author.userName}\`: hihi\n${nickname}: **+${debuffAmount}** ${ICON.EMO_DECEASED}`;
    } else {
      let debuffAmount = await setDebuff(
        target.userId,
        StatusField.PARANOID,
        true
      );
      str = `trượt chân té không chết nhưng u não\n\`${author.userName}\`: hihi\n\`${nickname}\`: **+${debuffAmount}** ${ICON.EMO_PARANOID}`;
    }
  } else if (chance < 67) {
    str = `bị \`${author.userName}\` túm lại thông toác đuýt, bị cướp tiền viện phí, ném dưới gầm cầu Vũ Đại\n\`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}\n\`${nickname}\`: **-${amount}** ${ICON.ICON_COIN}`;
    await statsInc(author.userId, StatsField.COIN, amount);
    await statsInc(target.userId, StatsField.COIN, -amount);

    await statsInc(author.userId, StatsField.EXP, amount);
    await statsInc(target.userId, StatsField.EXP, -amount);
  } else {
    let subStr = "";
    chance = Math.floor(Math.random() * 100);
    if (chance <= 50) {
      let debuffAmount = await setDebuff(
        author.userId,
        StatusField.DECEASED,
        true
      );
      subStr = `chết \`${author.userName}\`, nạn nhân mất tiền ma chay mua hòm\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}, **+${debuffAmount}** ${ICON.EMO_DECEASED}`;
    } else {
      subStr = `ngất \`${author.userName}\`, nạn nhân mất tiền viện\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}`;
    }
    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(author.userId, StatsField.EXP, -amount);

    str = `nhặt được bí kíp, bùng nổ bách vạn thần quyền, đấm ${subStr}`;
  }

  return `<@${target.userId}> chạy thoát nhưng ${str}`;
};

module.exports = { case10 };
