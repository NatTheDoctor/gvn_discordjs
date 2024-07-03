const UserSchema = require("../schema/user");
const { error, success } = require("../utils/Console");

const StatsField = {
  EXP: "exp",
  COIN: "coin",
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
  user.status[field] = flag;
  user.save();
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
