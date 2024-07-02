const UserSchema = require("../schema/user");

const fetchOrCreateGuild = async (guildId) => {
  const guild = await UserSchema.findOne({ id: guildId }).lean();
  if (guild) return guild;
  const query = new GuildSchema({ id: guildId });
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
