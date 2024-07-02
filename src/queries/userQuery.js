const UserSchema = require("../schema/user");

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

const statsInc = async (user) => {};

module.exports = {
  fetchUser,
  fetchOrCreateUser,
};
