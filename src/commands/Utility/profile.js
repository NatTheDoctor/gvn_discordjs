const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { getAllMessage } = require("../../queries/messageQuery");

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
  /**
   *
   * @param {DiscordBot} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    let id = interaction.user.id;
    let members = await getAllMessage(interaction);
    console.log(members);
    let embed = new EmbedBuilder().setDescription("tét");

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
}).toJSON();
