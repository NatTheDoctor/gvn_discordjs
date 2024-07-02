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

const statsInc = async (member, field) => {
  let user = await fetchUser(member.id);
  if (user === null) return;

  user.field += 1;
  await user.save();
};

module.exports = {
  fetchUser,
  fetchAllUsers,
  fetchOrCreateUser,
  statsInc,
  StatsField,
};
