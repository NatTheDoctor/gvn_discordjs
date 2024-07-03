const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { getAllMessage } = require("../../queries/messageQuery");
const { fetchUser } = require("../../queries/userQuery");
const { anvaProcess } = require("../../functions/anvas/anvaProcess");

module.exports = new ApplicationCommand({
  command: {
    name: "anva",
    description: "ăn vạ",
    type: 1,
    options: [],
  },
  options: {
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    let embed = new EmbedBuilder();
    let id = interaction.user.id;
    if (id !== "769368349414785055") return;
    let members = await getAllMessage(interaction);
    if (members.length < 1) {
      embed.setDescription(
        `\`#${interaction.channel.name}\`\nKhông có ai để ăn vạ.`
      );
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    let profile = await fetchUser(interaction.user.id);

    let result = await anvaProcess(profile, members);

    embed.setDescription(result);
    await interaction.reply({ embeds: [embed] });
  },
}).toJSON();
