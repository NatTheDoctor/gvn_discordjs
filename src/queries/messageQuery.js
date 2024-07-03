const MessageSchema = require("../schema/message");
const { success } = require("../utils/Console");

const fetchOrCreateMessage = async (m, user) => {
  const message = await MessageSchema.findOne({ messageId: m.id }).lean();
  if (message) return message;
  console.log(user);
  const query = new MessageSchema({
    messageId: m.id,
    channelId: m.channel.id,
    userId: m.author.id,
    timestamp: m.createdAt,
    status: {
      isDeceased: user.status.isDeceased,
      isCaptive: user.status.isCaptive,
      isParanoid: user.status.isParanoid,
    },
  });
  await query.save();
  return query;
};

const getAllMessage = async (interaction) => {
  const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000); // 3 minutes ago
  const messages = await MessageSchema.find({
    userId: { $ne: interaction.user.id },
    channelId: interaction.channelId,
    timestamp: { $gte: threeMinutesAgo },
    status: {
      $ne: { isDeceased: true },
      $ne: { isParanoid: true },
      $ne: { isCaptive: true },
    },
  });
  let members = [];
  for (x of messages) {
    if (members.includes(x.userId)) continue;
    members.push(x.userId);
  }
  members = shuffleArray(members);
  return members;
};
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
module.exports = {
  fetchOrCreateMessage,
  getAllMessage,
};
