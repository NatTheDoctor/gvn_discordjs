const MessageSchema = require("../schema/message");
const { success } = require("../utils/Console");

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

const getAllMessage = async (message) => {
  const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000); // 3 minutes ago
  const messages = await MessageSchema.find({
    userId: { $ne: message.author.id },
    channelId: message.channelId,
    timestamp: { $gte: threeMinutesAgo }, // timestamp is greater than or equal to 3 minutes ago
  });
  return messages.length;
};

module.exports = {
  fetchOrCreateMessage,
  getAllMessage,
};
