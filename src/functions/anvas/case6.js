const { setDebuff, StatusField } = require("../../queries/userQuery");
const { exchangeBaKien } = require("./exchangeRole");

const { ICON } = require("./ICON");
const case6 = async (author, target) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let chance = Math.floor(Math.random() * 100);
  if (chance <= 33) {
    let debuffAmount = await setDebuff(
      target.userId,
      StatusField.DECEASED,
      true
    );
    str = `vào hòm\n\`${author.userName}\`: hihi\n\`${nickname}\`: **+${debuffAmount}** ${ICON.EMO_DECEASED}`;
  } else if (chance <= 67) {
    let debuffAmount = await setDebuff(
      target.userId,
      StatusField.PARANOID,
      true
    );
    str = `vào trại thương điên\n\`${author.userName}\`: hihi\n\`${nickname}\`: **+${debuffAmount}** ${ICON.EMO_PARANOID}`;
  } else {
    let debuffAmount = await setDebuff(
      target.userId,
      StatusField.CAPTIVE,
      true
    );
    str = `vào tù"\n\`${author.userName}\`: hihi\n\`${nickname}\`: **+${debuffAmount}** ${ICON.EMO_CAPTIVE}`;
  }
  let strBaKien = "";
  if (author.isBaKien) {
    strBaKien = `\n\`${author.userName}\` -> ${ICON.ICON_BAKIEN} \`${nickname}\``;
    await exchangeBaKien(author, target);
  }
  return `hoá chaos tiễn <@${target.userId}> ${str}
  ${strBaKien}`;
};

module.exports = { case6 };
