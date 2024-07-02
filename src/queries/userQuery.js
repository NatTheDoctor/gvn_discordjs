const UserSchema = require("../schema/user");
const { error, success } = require("../utils/Console");

const StatsField = {
  EXP: "exp",
  COIN: "coin",
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
    userName: member.nickname,
  });
  await query.save();
  return query;
};

const statsInc = async (id, field, amount) => {
  let user = await fetchUser(id);
  if (user === null) return;
  if (field === StatsField.COIN && user.coin >= user.maxCoin) {
    user[field] = user.maxCoin;
  }
  if (field === StatsField.EXP && user.exp >= user.maxExp) {
    user.level += 1;
    user[field] = 0;
    user.maxExp = (user.maxExp + 124) * 1.19;
  }
  user[field] += amount;
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

const removeAllUsers = async () => {
  await UserSchema.deleteMany();
};

module.exports = {
  StatsField,
  fetchUser,
  fetchAllUsers,
  fetchOrCreateUser,
  statsInc,
  isDebuff,
  removeAllUsers,
};
