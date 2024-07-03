const { fetchUser } = require("../../queries/userQuery");
const { iconCoin } = require("../../utils/constants");

const anvaProcess = async () => {
  //   let firstTarget = await fetchUser(members[0]);
  //   let secondTarget = null;
  //   let str = "";
  //   let random = 1; //Math.floor(Math.random() * 6) + 1;
  //   if (members.length > 1) {
  //     secondTarget = await fetchUser(members[1]);
  //   }
  //   switch (random) {
  //     case 1: //Author win, firstTarget mất tiền
  //       str = case1(author, firstTarget);
  //       break;
  //     case 2:
  //       str = "2";
  //       break;
  //     case 3:
  //       str = "3";
  //       break;
  //     case 4:
  //       str = "4";
  //       break;
  //     case 5:
  //       str = "5";
  //       break;
  //     case 6:
  //       str = "6";
  //       break;
  //     case 7:
  //       str = "7";
  //       break;
  //   }
  //   return str;
};

const case1 = (author, target, amount) => {
  return `<@${target.userId}> ăn đấm, ngất tại chỗ, mất tiền\n\`${author.userName}\`: **+${amount}** ${iconCoin}\n\`${target.userName}\`: **-${amount}** ${iconCoin}`;
};

module.exports = { anvaProcess };
