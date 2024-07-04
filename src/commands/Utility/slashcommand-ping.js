const {
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
} = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { fetchUser, setDebuff, setBuff } = require("../../queries/userQuery");
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
      {
        name: "flag",
        description: "Select one of the options!",
        type: ApplicationCommandOptionType.Boolean,
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
    let mention = interaction.options.getUser("user", true);
    await setBuff(mention.id, interaction.options.getBoolean("flag"));
    await interaction.reply({
      content: mention,
    });
  },
}).toJSON();
