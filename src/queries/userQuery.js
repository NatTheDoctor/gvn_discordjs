const UserSchema = require("../schema/user");
const { error, success, update } = require("../utils/Console");
const { COLORS } = require("../utils/colors");

const StatsField = {
  EXP: "exp",
  COIN: "coin",
  ISDECEASED: "status.isDeceased",
  ISPARANOID: "status.isParanoid",
  ISCAPTIVE: "status.isCaptive",
  COUNT: "status.count",
};

const StatusField = {
  PARANOID: "isParanoid",
  DECEASED: "isDeceased",
  CAPTIVE: "isCaptive",
  BAKIEN: "isBaKien",
};

const fetchUser = async (userId) => {
  return await UserSchema.findOne({ userId: userId });
};
const fetchBaKien = async (userId) => {
  return await UserSchema.findOne({ isBaKien: true });
};

const fetchAllUsers = async (userId) => {
  return await UserSchema.find();
};

const fetchAllDailyUser = async (userId) => {
  return await UserSchema.find({ isDaily: true });
};

const fetchOrCreateUser = async (member) => {
  const user = await fetchUser(member.id);
  if (user) return user;
  const query = new UserSchema({
    userId: member.id,
    userName: member.displayName || member.user.username,
  });
  await query.save();
  return query;
};

const statsInc = async (id, field, amount) => {
  if (amount === 0) return;
  let user = await fetchUser(id);
  if (user === null) return;
  let exp = user.exp;
  let coin = user.coin;

  user[field] += amount;
  if (field === StatsField.EXP && user.exp > user.maxExp) {
    const levelsGained = Math.floor(user.exp / user.maxExp);
    user.level += levelsGained;
    user.exp -= levelsGained * user.maxExp;
    user.maxExp = (user.maxExp + 124) * 1.19;
  } else if (field === StatsField.COIN && user.coin > user.maxCoin) {
    user.coin = user.maxCoin;
  }
  await user.save().then((doc) => {
    if (doc.exp === exp && doc.coin === coin) return;
    if (doc.exp !== exp) {
      update(
        `${doc.userName}: exp ${COLORS.FgBlue}${exp.toFixed(0)}${
          COLORS.Reset
        } => ${COLORS.FgRed}${doc.exp.toFixed(0)}${COLORS.Reset}`
      );
    } else if (doc.coin !== coin) {
      update(
        `${doc.userName}: coin ${COLORS.FgBlue}${coin}${COLORS.Reset} => ${COLORS.FgRed}${doc.coin}${COLORS.Reset}`
      );
    }
  });
};

const decreaseDebuffCount = async (id, amount) => {
  let user = await fetchUser(id);
  if (user === null) return;
  let count = user.status.count;

  user.status.count += amount;
  if (user.status.count <= 0) {
    if (user.status.isDeceased) {
      await setDebuff(id, StatusField.DECEASED, false);
    }
    if (user.status.isCaptive) {
      await setDebuff(id, StatusField.CAPTIVE, false);
    }
    if (user.status.isParanoid) {
      await setDebuff(id, StatusField.PARANOID, false);
    }
  }

  await user.save().then((doc) => {
    update(
      `${doc.userName} debuff's count: ${COLORS.FgBlue}${count}${COLORS.Reset} => ${COLORS.FgRed}${doc.status.count}${COLORS.Reset} `
    );
  });
};

const isDebuff = async (id) => {
  let user = await fetchUser(id);
  if (user === null) return;
  let status = user.status;

  return (
    status.isCaptive === true ||
    status.isDeceased === true ||
    status.isParanoid === true
  );
};

const setDebuff = async (id, field, flag) => {
  let user = await fetchUser(id);
  if (user === null) return;
  let amount;
  let status = user.status[field];
  if (flag == true) {
    if (field === StatusField.DECEASED || field === StatusField.PARANOID) {
      amount = Math.floor(Math.random() * 6) + 2;
    } else if (field === StatusField.CAPTIVE) {
      amount = Math.floor(Math.random() * 25) + 20;
    }
    user.status.count += amount;
  }
  user.status[field] = flag;
  user.save().then((doc) => {
    update(
      `${doc.userName} ${status} => ${doc.status[field]}: ${doc.status.count} `
    );
  });
};

const setBuff = async (id, flag) => {
  let user = await fetchUser(id);
  if (user === null) return;
  let status = user.isBaKien;
  user.isBaKien = flag;
  user.save().then((doc) => {
    update(`${doc.userName} ${status} => ${doc.isBaKien}`);
  });
};

const setDaily = async (id, flag) => {
  let user = await fetchUser(id);
  if (user === null) return;
  user.isDaily = flag;
  user.save();
};

const removeAllUsers = async () => {
  await UserSchema.deleteMany();
};

module.exports = {
  StatsField,
  StatusField,
  fetchUser,
  fetchBaKien,
  fetchAllUsers,
  fetchAllDailyUser,
  fetchOrCreateUser,
  statsInc,
  isDebuff,
  setDebuff,
  setBuff,
  setDaily,
  decreaseDebuffCount,
  removeAllUsers,
};
