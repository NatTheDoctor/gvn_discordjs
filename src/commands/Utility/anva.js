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

const FLAG = {
  inefficientCoin: "coin",
  inefficientPlayer: "player",
  inStatus: "status",
};
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

      let flag = false;
      let strFlag = "";

      let members = await getAllMessage(interaction);
      if (members.length < 1) {
        await interaction.deferReply({ ephemeral: true });
        flag = FLAG.inefficientPlayer;
        strFlag = `\`#${interaction.channel.name}\`\nKhông có ai để ăn vạ.`;
      }
      let profile = await fetchUser(interaction.user.id);
      if (profile.coin < 36) {
        await interaction.deferReply({ ephemeral: true });
        flag = FLAG.inefficientCoin;
        strFlag = `\`#${interaction.channel.name}\`\nKhông đủ tiền để ăn vạ`;
      }

      const status = await isDebuff(id);
      if (status) {
        await interaction.deferReply({ ephemeral: true });
        flag = FLAG.inefficientCoin;
        strFlag = `\`#${interaction.channel.name}\`\nDính trạng thái, không ăn vạ được nhé`;
      }

      if (
        flag == FLAG.inStatus ||
        flag == FLAG.inefficientCoin ||
        flag == FLAG.inefficientPlayer
      ) {
        embed.setDescription(strFlag);

        return interaction.followUp({ embeds: [embed] });
      }
      await interaction.deferReply();
      let result = await anvaProcess(profile, members);

      await interaction.followUp({ content: result });

      await statsInc(id, StatsField.COIN, -36);
      cooldownMap.set(interaction.channelId, now);
    } catch (err) {
      error(err);
    }
  },
}).toJSON();
