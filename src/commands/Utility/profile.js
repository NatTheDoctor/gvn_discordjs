const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { getAllMessage } = require("../../queries/messageQuery");
const { fetchUser } = require("../../queries/userQuery");
const { anvaProcess } = require("../../functions/anvas/anvaProcess");

module.exports = new ApplicationCommand({
  command: {
    name: "profile",
    description: "Mở profile",
    type: 1,
    options: [],
  },
  options: {
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    let embed = new EmbedBuilder();
    let id = interaction.user.id;
    let profile = await fetchUser(interaction.user.id);
    if (profile === null) return;

    embed.setDescription(`
      <:notcoin:988449419621990470>: ${profile.coin}
      🧪: ${((profile.exp / profile.maxExp) * 100).toFixed(2)}%
      Debuff: ${profile.status.count}
      `);
    await interaction.reply({ embeds: [embed] });
  },
}).toJSON();
