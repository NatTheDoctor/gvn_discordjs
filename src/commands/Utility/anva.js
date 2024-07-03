const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { getAllMessage } = require("../../queries/messageQuery");
const { fetchUser, statsInc, StatsField } = require("../../queries/userQuery");
const { anvaProcess } = require("../../functions/anvas/anvaProcess");
const { success } = require("../../utils/Console");

const cooldownMap = new Map();

module.exports = new ApplicationCommand({
  command: {
    name: "anva",
    description: "ăn vạ",
    type: 1,
    options: [],
  },
  options: {
    cooldown: 30000,
  },
  run: async (client, interaction) => {
    let embed = new EmbedBuilder();
    let id = interaction.user.id;

    const now = Date.now();
    const cooldownTime = 15 * 1000; // 1 minute
    const lastExecutionTime = cooldownMap.get(interaction.channelId);
    if (lastExecutionTime && now - lastExecutionTime < cooldownTime) {
      return; // cooldown not expired, skip execution
    }

    let members = await getAllMessage(interaction);
    if (members.length < 1) {
      embed.setDescription(
        `\`#${interaction.channel.name}\`\nKhông có ai để ăn vạ.`
      );
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    let profile = await fetchUser(interaction.user.id);

    if (profile.coin < 36) {
      embed.setDescription(
        `\`#${interaction.channel.name}\`\nKhông đủ tiền để ăn vạ`
      );
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    let result = await anvaProcess(profile, members);

    await interaction.reply({ content: result });

    await statsInc(id, StatsField.COIN, -36);
    cooldownMap.set(interaction.channelId, now); // update last execution time
  },
}).toJSON();
