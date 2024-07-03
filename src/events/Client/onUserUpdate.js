const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");
const { getMember } = require("../../utils/getMember");
module.exports = new Event({
  event: "guildMemberUpdate",
  once: false,
  run: async (__client__, message) => {
    const { author, id, guild, member } = await getMember(message);
    console.log("a");
    console.log(member);
  },
}).toJSON();
