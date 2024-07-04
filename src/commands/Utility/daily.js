const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");
const { fetchUser } = require("../../queries/userQuery");
const { success } = require("../../utils/Console");

module.exports = new ApplicationCommand({
  command: {
    name: "daily",
    description: "lệnh daily",
    type: 1,
    options: [],
  },
  options: {
    cooldown: 5000,
  },
  run: async (client, interaction) => {
    let id = interaction.user.id;
    let profile = await fetchUser(id);
    if (profile == null) {
      return await interaction.reply({
        content: `Lỗi, gõ lại`,
        ephemeral: true,
      });
    }
    if (profile.isDaily) {
      return await interaction.reply({
        content: `Nhận daily rồi thì gõ cái gì?`,
        ephemeral: true,
      });
    }
    await interaction.deferReply({ ephemeral: true });

    let embed = new EmbedBuilder().setDescription(
      `Nhận daily hay không?\n<:notcoin:988449419621990470>: ${profile.coin}\n🧪: ${profile.exp} / ${profile.maxExp}`
    );
    await interaction.followUp({
      embeds: [embed],
      ephemeral: true,
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              custom_id: "accept",
              label: "Đồng ý",
              style: 1,
            },
            {
              type: 2,
              custom_id: "deny",
              label: "Lúc khác",
              style: 1,
            },
          ],
        },
      ],
    });
  },
}).toJSON();
