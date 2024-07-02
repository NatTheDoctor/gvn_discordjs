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

const statsInc = async (id, field) => {
  let user = await fetchUser(id);
  if (user === null) return;
  if (field === StatsField.COIN && user.coin === user.maxCoin) return;
  if (field === StatsField.EXP && user.exp === user.maxExp) {
    user.level += 1;
    user.exp = 0;
    user.maxExp = (user.maxExp + 124) * 1.19;
  }
  user[field] += 1;
  await user.save();
};

const removeAllUsers = async () => {
  await UserSchema.deleteMany();
};

module.exports = {
  fetchUser,
  fetchAllUsers,
  fetchOrCreateUser,
  statsInc,
  StatsField,
  removeAllUsers,
};
