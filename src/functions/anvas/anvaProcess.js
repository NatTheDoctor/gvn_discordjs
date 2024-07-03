const {
  fetchUser,
  statsInc,
  StatsField,
  setDebuff,
  StatusField,
  setBuff,
} = require("../../queries/userQuery");

const ICON = {
  ICON_BAKIEN: "\uD83D\uDC51",
  ICON_DECEASED: "👻",
  EMO_DECEASED: "<a:chet:1255446300942401646>",
  ICON_PARANOID: "\uD83E\uDD21",
  EMO_PARANOID: "<a:cogiat:1255445604235083806>",
  ICON_CAPTIVE: "\uD83D\uDEB7",
  EMO_CAPTIVE: "<a:tunhan:1255444756729692210>",
  ICON_COIN: "<:notcoin:988449419621990470>",
};

const ROLE = {
  BAKIEN: "1242495746952007781",
};

const anvaProcess = async (author, members) => {
  let firstTarget = await fetchUser(members[0]);
  let secondTarget = null;
  let str = "";
  let amount = 2;
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

const case1 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  await statsInc(author.userId, StatsField.COIN, amount);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, amount);
  await statsInc(target.userId, StatsField.EXP, -amount);

  let strBaKien = `\`${nickname}\` -> ${ICON.ICON_BAKIEN} \`${author.userName}\``;
  await exchangeBaKien(firstTarget, author);

  return `đánh ngất <@${target.userId}>, loot tiền
  \`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}
  ${nickname}: **-${amount}** ${ICON.ICON_COIN}
  ${strBaKien}`;
};
const case2 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  let lossCoin = Math.floor(Math.random() * amount);
  await statsInc(author.userId, StatsField.COIN, amount - lossCoin);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, amount);
  await statsInc(target.userId, StatsField.EXP, -amount);
  let strBaKien = `\`${nickname}\` -> ${ICON.ICON_BAKIEN} \`${author.userName}\``;
  await exchangeBaKien(firstTarget, author);
  return `đấm <@${target.userId}> bầm dập, loot thì ít mà rớt thì nhiều
  \`${author.userName}\`: **+${amount - lossCoin}** ${ICON.ICON_COIN}
  ${nickname}: **-${amount}** ${ICON.ICON_COIN}
  ${strBaKien}`;
};
const case3 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  let random = Math.floor(Math.random() * 100);
  let str = "";
  if (random < 50) {
    str = `, hai đứa ăn hại làm rớt ví\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}\n${nickname}: **-${amount}** ${ICON.ICON_COIN}`;
    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, -amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, -amount);
  }
  return `đánh hoà với <@${target.userId}> ${str}`;
};
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
  } else {
    str += `\n\`${nickname}\`: ${ICON.EMO_PARANOID}`;
  }
  return `đấm <@${target.userId}> giường chiếu rung chuyển, hai đứa thượng mã phong, không biết điên chết ${str}`;
};

const case5 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let chance = Math.floor(Math.random() * 100);
  let str = "";
  if (chance <= 50) {
    str = `còn nhặt được tiền dưới đất.
    \`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}
    \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;

    await statsInc(author.userId, StatsField.COIN, amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, amount);
    await statsInc(target.userId, StatsField.EXP, amount);
  }
  return `vừa gặp <@${target.userId}> đã yêu, hai bên ôm nhau thắm thiết ra về `;
};

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
  let strBaKien = `\`${author.userName}\` -> ${ICON.ICON_BAKIEN} \`${nickname}\``;
  await exchangeBaKien(author, firstTarget);
  return `hoá chaos tiễn <@${target.userId}> ${str}
  ${strBaKien}`;
};

const case7 = async (author, target) => {
  return `<@${target.userId}> vừa chạy vừa chửi \`${author.userName}\` phế vật vô dụng`;
};

const case8 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;

  let lossCoin = Math.floor(Math.random() * amount) + 1;
  await statsInc(author.userId, StatsField.COIN, -amount);
  await statsInc(target.userId, StatsField.COIN, amount - lossCoin);

  await statsInc(author.userId, StatsField.EXP, -amount);
  await statsInc(target.userId, StatsField.EXP, amount - lossCoin);

  let strBaKien = `\`${author.userName}\` -> ${ICON.ICON_BAKIEN} \`${nickname}\``;
  await exchangeBaKien(author, firstTarget);

  return `<@${target.userId}> đánh ngất \`${
    author.userName
  }\`, cướp tiền nhưng làm rớt
    \`${author.userName}\`: **-${amount - lossCoin}** ${ICON.ICON_COIN}
    \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN} 
    ${strBaKien}`;
};

const case9 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let str = "";
  let chance = Math.floor(Math.random() * 100);
  if (chance < 50) {
    str = `, phạt cả hai tội gây rối nơi công cộng
    \`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}
    \`${nickname}\`: **-${amount}** ${ICON.ICON_COIN}`;
  }
  await statsInc(author.userId, StatsField.COIN, -amount);
  await statsInc(target.userId, StatsField.COIN, -amount);

  await statsInc(author.userId, StatsField.EXP, -amount);
  await statsInc(target.userId, StatsField.EXP, -amount);

  return `<@${target.userId}> đánh hoà \`${author.userName}\` ${str}`;
};

const case10 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let str = "";
  let chance = Math.floor(Math.random() * 100);
  if (chance < 33) {
    chance = Math.floor(Math.random() * 100);
    if (chance < 50) {
      str = `trượt chân té chết
    \`${author.userName}\`: hihi
    \`${nickname}\`: ${ICON.EMO_DECEASED}`;
      await setDebuff(target.userId, StatusField.DECEASED, true);
    } else {
      str = `trượt chân té không chết nhưng u não
    \`${author.userName}\`: hihi
    \`${nickname}\`: ${ICON.EMO_PARANOID}`;
      await setDebuff(target.userId, StatusField.PARANOID, true);
    }
  } else if (chance < 67) {
    str = `bị \`${author.userName}\` túm lại thông toác đuýt, bị cướp tiền viện phí, ném dưới gầm cầu Vũ Đại
    \`${author.userName}\`: **+${amount}** ${ICON.ICON_COIN}
    \`${nickname}\`: **-${amount}** ${ICON.ICON_COIN}`;
    await statsInc(author.userId, StatsField.COIN, amount);
    await statsInc(target.userId, StatsField.COIN, -amount);

    await statsInc(author.userId, StatsField.EXP, amount);
    await statsInc(target.userId, StatsField.EXP, -amount);
  } else {
    let subStr = "";
    chance = Math.floor(Math.random() * 100);
    if (chance <= 50) {
      subStr = `chết \`${author.userName}\`, lột tiền`;
      subStr += `\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}, ${ICON.EMO_DECEASED}
      \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;
      await setDebuff(user.userId, StatusField.DECEASED, true);
    } else {
      subStr = `ngất \`${author.userName}\`, lột tiền`;
      subStr += `\n\`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}
      \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;
    }
    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, amount);

    str = `nhặt được bí kíp, bùng nổ bách vạn thần quyền, đấm ${subStr}`;
  }

  return `<@${target.userId}> chạy thoát nhưng ${str}`;
};

const case11 = async (author, target, amount) => {
  let nickname =
    target.userName !== null ? `\`${target.userName}\`` : `<@${target.userId}>`;
  let str = "";
  let chance = Math.floor(Math.random() * 100);
  if (chance < 33) {
    str += ` rồi cướp tiền
    \`${author.userName}\`: **-${amount - lossCoin}** ${ICON.ICON_COIN}
    \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;

    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, amount);
  } else if (chance < 55) {
    str += ` rồi cướp sắc, cướp xong giết luôn
    \`${author.userName}\`: ${ICON.EMO_DECEASED}
    \`${nickname}\`: hihi`;

    await setDebuff(author.userId, StatusField.DECEASED, true);
  } else {
    str += ` rồi cướp tiền, cướp sắc, cướp cả mạng
    \`${author.userName}\`: **-${amount}** ${ICON.ICON_COIN}, ${ICON.EMO_DECEASED}
    \`${nickname}\`: **+${amount}** ${ICON.ICON_COIN}`;

    await statsInc(author.userId, StatsField.COIN, -amount);
    await statsInc(target.userId, StatsField.COIN, amount);

    await statsInc(author.userId, StatsField.EXP, -amount);
    await statsInc(target.userId, StatsField.EXP, amount);

    await setDebuff(author.userId, StatusField.DECEASED, true);
  }
  let strBaKien = `\n\`${author.userName}\` -> ${ICON.ICON_BAKIEN} \`${nickname}\``;
  await exchangeBaKien(author, firstTarget);

  return `<@${target.userId}> rút dao chém \`${author.userName}\` ${str} ${strBaKien}`;
};

const exchangeBaKien = async (hadBaKien, notHaveBaKien) => {
  if (hadBaKien.isBaKien) {
    await setBuff(hadBaKien.userId, false);
    await setBuff(notHaveBaKien.userId, false);
  }
};
module.exports = { anvaProcess, ICON, ROLE };
