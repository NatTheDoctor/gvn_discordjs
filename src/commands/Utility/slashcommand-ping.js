const { ChatInputCommandInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { fetchOrCreateGuild } = require("../../queries/userQuery");

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
    console.log(fetchOrCreateGuild(interaction.user.id));
    await interaction.reply({
      content: "**Pong!** " + client.ws.ping + "ms",
    });
  },
}).toJSON();
