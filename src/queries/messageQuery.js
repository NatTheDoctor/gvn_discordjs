const MessageSchema = require("../schema/message");
const { success } = require("../utils/Console");
const { fetchUser, isDebuff } = require("./userQuery");

const fetchOrCreateMessage = async (m, user) => {
  const message = await MessageSchema.findOne({ messageId: m.id }).lean();
  if (message) return message;
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
    $and: [
      { "status.isDeceased": { $ne: true } },

      { "status.isParanoid": { $ne: true } },

      { "status.isCaptive": { $ne: true } },
    ],
  });
  let members = [];
  for (x of messages) {
    if (members.includes(x.userId)) continue;
    let profile = await fetchUser(x.userId);
    console.log(profile);
    success(x.userId);
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
