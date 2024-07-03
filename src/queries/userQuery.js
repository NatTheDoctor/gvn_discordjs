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
  BAKIEN: "isBaKien",
};

const fetchUser = async (userId) => {
  const startTime = performance.now();

  const user = await UserSchema.findOne({ userId: userId });
  if (user === null) return;

  const endTime = performance.now();
  const executionTime = (endTime - startTime).toFixed(1);
  success(`FetchUser: ${user.userName} ${executionTime} ms`);
  return user;
};

const fetchAllUsers = async (userId) => {
  return await UserSchema.find();
};

const fetchOrCreateUser = async (member) => {
  const startTime = performance.now();

  const user = await fetchUser(member.id);
  if (user) return user;
  const query = new UserSchema({
    userId: member.id,
    userName: member.displayName || member.user.username,
  });
  await query.save();

  const endTime = performance.now();
  const executionTime = (endTime - startTime).toFixed(1);
  success(`CreateUser: ${user.userName} ${executionTime} ms`);
  return query;
};

const statsInc = async (user, field, amount) => {
  const startTime = performance.now();
  if (user === null) return;
  user[field] += amount;
  if (field === StatsField.EXP && user.exp > user.maxExp) {
    const levelsGained = Math.floor(user.exp / user.maxExp);
    user.level += levelsGained;
    user.exp -= levelsGained * user.maxExp;
    user.maxExp = (user.maxExp + 124) * 1.19;
  } else if (field === StatsField.COIN && user.coin > user.maxCoin) {
    user.coin = user.maxCoin;
  }
  await user.save();

  const endTime = performance.now();
  const executionTime = (endTime - startTime).toFixed(1);
  success(`CreateUser: ${user.userName} ${executionTime} ms`);
};

const decreaseDebuffCount = async (user, amount) => {
  if (user === null) return;
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
    success(`Decreased ${doc.userName} debuff's count: ${doc.status.count} `);
  });
};

const isDebuff = async (user) => {
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
  decreaseDebuffCount,
  removeAllUsers,
};
