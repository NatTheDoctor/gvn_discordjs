const { ChatInputCommandInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { fetchOrCreateUser } = require("../../queries/userQuery");

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
    let user = await fetchOrCreateUser(interaction.user.id);
    console.log(user);
    await interaction.reply({
      content: "**Pong!** " + client.ws.ping + "ms",
    });
  },
}).toJSON();
