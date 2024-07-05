const {
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
} = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const {
  fetchUser,
  setDebuff,
  setBuff,
  fetchBaKien,
} = require("../../queries/userQuery");
module.exports = new ApplicationCommand({
  command: {
    name: "ping",
    description: "Replies with Pong!",
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
    let bakien = await fetchBaKien(interaction.user.id);
    await interaction.reply({
      content: bakien.userName,
    });
  },
}).toJSON();
