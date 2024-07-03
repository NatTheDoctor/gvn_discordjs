const { iconCoin } = require("../constants");

const case1 = async (author, target, amount) => {
  return `<@${target.userId}> ăn đấm, ngất tại chỗ, mất tiền\n\`${author.userName}\`: **+${amount}** ${iconCoin}\n\`${target.userName}\`: **-${amount}** ${iconCoin}`;
};

module.exports = { case1 };
