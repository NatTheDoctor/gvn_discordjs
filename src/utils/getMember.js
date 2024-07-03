async function getMember(message) {
  console.log(message);
  const author = message.author;
  const id = author.id;
  const guild = message.guild; // or message.guild, depending on your setup
  const member = await guild.members.fetch(id);
  return { author, id, guild, member };
}

module.exports = { getMember };
