const { ChatInputCommandInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
module.exports = new ApplicationCommand({
  command: {
    name: "ping",
    description: "Replies with Pong!",
    type: 1,
    options: [
      {
        name: "user",
        description: "Select one of the options!",
        type: ApplicationCommandOptionType.String,
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
    console.log(interaction.options.getUser("user", true));

    await interaction.reply({
      content: mention,
    });
  },
}).toJSON();
