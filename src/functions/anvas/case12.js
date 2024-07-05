const { ICON } = require("./ICON");

const case12 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  return `đang hằm hằm nhìn <@${target.userId}> thì ${ICON.ICON_BAKIEN}`;
};

module.exports = { case12 };
