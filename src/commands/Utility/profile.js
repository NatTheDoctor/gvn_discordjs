const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { getAllMessage } = require("../../queries/messageQuery");
const { fetchUser } = require("../../queries/userQuery");
const { anvaProcess } = require("../../utils/anvas/anvaProcess");

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
    let members = await getAllMessage(interaction);
    if (members.length < 1) {
      embed.setDescription(
        `\`#${interaction.channel.name}\`\nKhông có ai để ăn vạ.`
      );
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    let profile = await fetchUser(interaction.user.id);

    let result = await anvaProcess();

    embed.setDescription(result);
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
}).toJSON();
