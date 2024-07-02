const UserSchema = require("../schema/user");

const fetchOrCreateUser = async (member) => {
  const user = await UserSchema.findOne({ id: member.id }).lean();
  if (user) return user;
  const query = new UserSchema({
    userId: member.id,
    userName: member.displayName,
  });
  await query.save();

  return query;
};

module.exports = {
  fetchOrCreateUser,
};
