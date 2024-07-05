const {
  setDebuff,
  StatusField,
  statsInc,
  StatsField,
} = require("../../queries/userQuery");
const { ICON } = require("./ICON");
const { exchangeBaKien } = require("./exchangeRole");

const case11 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let str = "";
  let chance = Math.floor(Math.random() * 100);
  if (chance < 33) {
    str += ` rồi cướp tiền\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}\n\`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;

    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, amount);
  } else if (chance < 55) {
    let debuffAmount = await setDebuff(
      author.userId,
      StatusField.DECEASED,
      true
    );
    str += ` rồi cướp sắc, cướp xong giết luôn\n\`${author.userName}\`: **+${debuffAmount}** ${ICON.EMO_DECEASED}\n\`${nickname}\`: hihi`;
  } else {
    let debuffAmount = await setDebuff(
      author.userId,
      StatusField.DECEASED,
      true
    );
    str += ` rồi cướp tiền, cướp sắc, cướp cả mạng\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}, **+${debuffAmount}** ${ICON.EMO_DECEASED}\n\`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;

    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, amount);
  }
  let strBaKien = "";
  if (author.isBaKien) {
    strBaKien = `\n\`${author.userName}\` -> ${ICON.ICON_BAKIEN} \`${nickname}\``;
    await exchangeBaKien(author, target);
  }

  return `<@${target.userId}> rút dao chém \`${author.userName}\` ${str} ${strBaKien}`;
};

module.exports = { case11 };
