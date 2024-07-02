const MessageSchema = require("../schema/message");

const fetchOrCreateMessage = async (message) => {
  const message = await MessageSchema.findOne({ messageId: message.id }).lean();
  if (message) return message;
  const query = new MessageSchema({
    messageId: message.id,
    channelId: message.channel.id,
    userId: message.author.id,
    timestamp: message.createdAt,
  });
  await query.save();
  return query;
};

module.exports = {
  fetchOrCreateMessage,
};
