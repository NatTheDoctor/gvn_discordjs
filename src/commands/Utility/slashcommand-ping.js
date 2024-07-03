const { ChatInputCommandInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const {
  fetchOrCreateUser,
  fetchUser,
  setDebuff,
  StatusField,
} = require("../../queries/userQuery");
const { fetchOrCreateMessage } = require("../../queries/messageQuery");

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
    let profile = await fetchUser(interaction.user.id);
    if (profile === null) return;
    await setDebuff(profile.userId, StatusField.DECEASED, false);
    await interaction.reply({
      content: "**Pong!** " + client.ws.ping + "ms",
    });
  },
}).toJSON();
