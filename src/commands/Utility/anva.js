const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { getAllMessage } = require("../../queries/messageQuery");
const {
  fetchUser,
  statsInc,
  StatsField,
  isDebuff,
} = require("../../queries/userQuery");
const { anvaProcess } = require("../../functions/anvas/anvaProcess");
const { success, error } = require("../../utils/Console");

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
    try {
      let embed = new EmbedBuilder();
      let id = interaction.user.id;

      const now = Date.now();
      const cooldownTime = 15 * 1000; // 1 minute
      const lastExecutionTime = cooldownMap.get(interaction.channelId);
      if (lastExecutionTime && now - lastExecutionTime < cooldownTime) {
        return; // cooldown not expired, skip execution
      }

      let strFlag = "";

      let members = await getAllMessage(interaction);
      await interaction.deferReply();
      if (members.length < 1) {
        strFlag = `\`#${interaction.channel.name}\`\nKhông có ai để ăn vạ.`;
        embed.setDescription(strFlag);

        return interaction.followUp({ embeds: [embed] });
      }
      let profile = await fetchUser(interaction.user.id);
      if (profile.coin < 36) {
        strFlag = `\`#${interaction.channel.name}\`\nKhông đủ tiền để ăn vạ`;
        embed.setDescription(strFlag);

        return interaction.followUp({ embeds: [embed] });
      }

      const status = await isDebuff(id);
      if (status) {
        strFlag = `\`#${interaction.channel.name}\`\nDính trạng thái, không ăn vạ được nhé`;
        embed.setDescription(strFlag);

        return interaction.followUp({ embeds: [embed] });
      }
      let result = await anvaProcess(profile, members);

      await interaction.followUp({ content: result });

      await statsInc(id, StatsField.COIN, -36);
      cooldownMap.set(interaction.channelId, now);
    } catch (err) {
      error(err);
    }
  },
}).toJSON();
