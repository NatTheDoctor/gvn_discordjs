const UserSchema = require("../schema/user");
const { error } = require("../utils/Console");

const StatsField = {
  EXP: "exp",
  COIN: "coin",
};

const fetchUser = async (userId) => {
  return await UserSchema.findOne({ userId: userId }).lean();
};

const fetchOrCreateUser = async (member) => {
  const user = await fetchUser(member.id);
  if (user) return user;
  const query = new UserSchema({
    userId: member.id,
    userName: member.displayName,
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
  fetchOrCreateUser,
  statsInc,
  StatsField,
};
