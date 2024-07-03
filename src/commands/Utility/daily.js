const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { fetchUser } = require("../../queries/userQuery");
const { success } = require("../../utils/Console");

module.exports = new ApplicationCommand({
  command: {
    name: "daily",
    description: "lệnh daily",
    type: 1,
    options: [],
  },
  options: {
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    let id = interaction.user.id;
    let profile = await fetchUser(id);
    if (profile == null) {
      return await interaction.reply({
        content: `Lỗi, gõ lại`,
        ephemeral: true,
      });
    }
    await interaction.reply({ content: `Test Daily`, ephemeral: true });
  },
}).toJSON();
