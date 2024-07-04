const { setDebuff, StatusField } = require("../../queries/userQuery");
const { ICON } = require("./ICON");

const case4 = async (author, target) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let authorChance = Math.floor(Math.random() * 100);
  let targetChance = Math.floor(Math.random() * 100);
  let str = "";
  if (authorChance <= 50) {
    str += `\n\`${author.userName}\`: ${ICON.EMO_DECEASED}`;
    await setDebuff(author.userId, StatusField.DECEASED, true);
  } else {
    str += `\n\`${author.userName}\`: ${ICON.EMO_PARANOID}`;
    await setDebuff(author.userId, StatusField.PARANOID, true);
  }

  if (targetChance <= 50) {
    str += `\n\`${nickname}\`: ${ICON.EMO_DECEASED}`;
    await setDebuff(target.userId, StatusField.DECEASED, true);
  } else {
    str += `\n\`${nickname}\`: ${ICON.EMO_PARANOID}`;
    await setDebuff(target.userId, StatusField.PARANOID, true);
  }
  return `đấm <@${target.userId}> giường chiếu rung chuyển, hai đứa thượng mã phong, không biết điên chết ${str}`;
};

module.exports = { case4 };
