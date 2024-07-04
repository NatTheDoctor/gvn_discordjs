const { setDebuff, StatusField } = require("../../queries/userQuery");
const { exchangeBaKien } = require("./exchangeRole");

const { ICON } = require("./ICON");
const case6 = async (author, target) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let chance = Math.floor(Math.random() * 100);
  if (chance <= 33) {
    str = `vào hòm
    \`${author.userName}\`: hihi
    \`${nickname}\`: ${ICON.EMO_DECEASED}`;
    await setDebuff(target.userId, StatusField.DECEASED, true);
  } else if (chance <= 67) {
    str = `vào trại thương điên
    \`${author.userName}\`: hihi
    \`${nickname}\`: ${ICON.EMO_PARANOID}`;
    await setDebuff(target.userId, StatusField.PARANOID, true);
  } else {
    str = `vào tù"
    \`${author.userName}\`: hihi
    \`${nickname}\`: ${ICON.EMO_CAPTIVE}`;
    await setDebuff(target.userId, StatusField.CAPTIVE, true);
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
