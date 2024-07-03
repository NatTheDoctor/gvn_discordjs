const UserSchema = require("../schema/user");
const { error, success } = require("../utils/Console");

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
};

const fetchUser = async (userId) => {
  return await UserSchema.findOne({ userId: userId });
};

const fetchAllUsers = async (userId) => {
  return await UserSchema.find();
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
  let user = await fetchUser(id);
  if (user === null) return;
  user[field] += amount;
  if (field === StatsField.EXP && user.exp > user.maxExp) {
    const levelsGained = Math.floor(user.exp / user.maxExp);
    user.level += levelsGained;
    user.exp -= levelsGained * user.maxExp;
    user.maxExp = (user.maxExp + 124) * 1.19;
  } else if (field === StatsField.COIN && user.coin > user.maxCoin) {
    user.coin = user.maxCoin;
  } else if (field === StatsField.COUNT && user.status.count <= 0) {
    if (user.status.isDeceased) {
      await setDebuff(user.userId, StatusField.DECEASED, false);
    }
    if (user.status.isParanoid) {
      await setDebuff(user.userId, StatusField.PARANOID, false);
    }
    if (user.status.isCaptive) {
      await setDebuff(user.userId, StatusField.CAPTIVE, false);
    }
  }
  await user.save();
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
    success(
      `Updated ${doc.userName} ${doc.status[field]}: ${doc.status.count} `
    );
  });
};

const removeAllUsers = async () => {
  await UserSchema.deleteMany();
};

module.exports = {
  StatsField,
  StatusField,
  fetchUser,
  fetchAllUsers,
  fetchOrCreateUser,
  statsInc,
  isDebuff,
  setDebuff,
  removeAllUsers,
};
