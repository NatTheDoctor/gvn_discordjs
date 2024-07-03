const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");
const { getMember } = require("../../utils/getMember");
const { fetchUser } = require("../../queries/userQuery");
module.exports = new Event({
  event: "guildMemberUpdate",
  once: false,
  run: async (__client__, message, oldMember, newMember) => {
    const { author, id, guild, member } = await getMember(message);
    let profile = await fetchUser(id);
    if (profile === null) return;
    success(profile);
    success(message.nickname);
    success(oldMember.nickname);
    success(newMember.nickname);
  },
}).toJSON();
