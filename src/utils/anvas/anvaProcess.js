const { fetchUser } = require("../../queries/userQuery");
const { case1 } = require("./case1");

const processAnva = async (author, members) => {
  let firstTarget = await fetchUser(members[0]);
  let secondTarget = null;
  let str = "";
  let random = 1; //Math.floor(Math.random() * 6) + 1;
  if (members.length > 1) {
    secondTarget = await fetchUser(members[1]);
  }
  switch (random) {
    case 1: //Author win, firstTarget mất tiền
      str = await case1(author, firstTarget);
      break;
    case 2:
      str = "2";
      break;
    case 3:
      str = "3";
      break;
    case 4:
      str = "4";
      break;
    case 5:
      str = "5";
      break;
    case 6:
      str = "6";
      break;
    case 7:
      str = "7";
      break;
  }

  return str;
};

module.exports = { processAnva };
