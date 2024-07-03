const processAnva = async (members) => {
  let str = "";
  let random = Math.floor(Math.random() * 6) + 1;
  switch (random) {
    case 1:
      str = "1";
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
