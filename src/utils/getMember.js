async function getMember(message) {
  const id = message.id;
  const guild = message.guild; // or message.guild, depending on your setup
  const member = await guild.members.fetch(id);
  return { id, guild, member };
}

module.exports = { getMember };
