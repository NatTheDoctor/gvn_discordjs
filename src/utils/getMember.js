async function getMember(member) {
  const id = member.id;
  const guild = member.guild; // or message.guild, depending on your setup
  const member = await guild.members.fetch(id);
  return { author, id, guild, member };
}

module.exports = { getMember };
