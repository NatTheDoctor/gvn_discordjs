const UserSchema = require("../schema/user");

const fetchOrCreateUser = async (userId) => {
  const user = await UserSchema.findOne({ id: userId }).lean();
  if (user) return user;
  const query = new UserSchema({ id: userId });
  await query.save();

  return query;
};

const updateGuild = async (guildId, data) => {
  return await UserSchema.findOneAndUpdate({ id: guildId }, data, {
    upsert: true,
  });
};

module.exports = {
  fetchOrCreateGuild,
  updateGuild,
};
