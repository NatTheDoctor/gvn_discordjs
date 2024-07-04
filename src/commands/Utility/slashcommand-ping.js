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
    options: [
      {
        name: "user",
        description: "Select one of the options!",
        type: ApplicationCommandOptionType.User,
        autocomplete: true,
        required: true,
      },
    ],
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
    console.log(interaction.options.data);

    await interaction.reply({
      content: mention,
    });
  },
}).toJSON();
