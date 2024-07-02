const MessageSchema = require("../schema/message");

const fetchOrCreateMessage = async (m) => {
  const message = await MessageSchema.findOne({ messageId: m.id }).lean();
  if (message) return message;
  const query = new MessageSchema({
    messageId: m.id,
    channelId: m.channel.id,
    userId: m.author.id,
    timestamp: m.createdAt,
  });
  await query.save();
  return query;
};

const getAllMessage = async (channelId) => {
  const messages = await MessageSchema.find({ channelId: channelId });
  return messages.length;
};

module.exports = {
  fetchOrCreateMessage,
  getAllMessage,
};
