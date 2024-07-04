const { fetchUser, setBuff } = require("../../queries/userQuery");
const { case1 } = require("./case1");
const { case10 } = require("./case10");
const { case11 } = require("./case11");
const { case2 } = require("./case2");
const { case3 } = require("./case3");
const { case4 } = require("./case4");
const { case5 } = require("./case5");
const { case6 } = require("./case6");
const { case7 } = require("./case7");
const { case8 } = require("./case8");
const { case9 } = require("./case9");

const anvaProcess = async (author, members) => {
  let firstTarget = await fetchUser(members[0]);
  let secondTarget = null;
  let str = "";
  let amount = Math.floor(Math.random() * 18);
  let random = Math.floor(Math.random() * 11) + 1;
  if (members.length > 1) {
    secondTarget = await fetchUser(members[1]);
  }
  switch (random) {
    case 1: //Author win, firstTarget mất tiền
      str = case1(author, firstTarget, amount);
      break;
    case 2: //Author win, firstTarget mất tiền, rớt tiền
      str = case2(author, firstTarget, amount);
      break;
    case 3:
      str = case3(author, firstTarget, amount);
      break;
    case 4:
      str = case4(author, firstTarget);
      break;
    case 5:
      str = case5(author, firstTarget, amount);
      break;
    case 6:
      str = case6(author, firstTarget);
      break;
    case 7:
      str = case7(author, firstTarget);
      break;
    case 8:
      str = case8(author, firstTarget, amount);
      break;
    case 9:
      str = case9(author, firstTarget, amount);
      break;
    case 10:
      str = case10(author, firstTarget, amount);
      break;
    case 11:
      str = case11(author, firstTarget, amount);
      break;
  }
  return str;
};
module.exports = { anvaProcess };
