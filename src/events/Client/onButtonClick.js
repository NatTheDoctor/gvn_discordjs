const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");
const { EmbedBuilder } = require("discord.js");

module.exports = new Event({
  event: "interactionCreate",
  once: false,
  run: async (__client__, interaction) => {
    if (interaction.isButton()) {
      let customId = interaction.component.data.custom_id;
      if (customId === "accept") {
        let embed = new EmbedBuilder().setDescription(`Đã chuyển khoản`);
        await interaction.update({
          embeds: [embed],
          ephemeral: true,
        });
      } else if (customId === "deny") {
        let embed = new EmbedBuilder().setDescription(`OK`);
        await interaction.update({
          embeds: [embed],
          ephemeral: true,
        });
      }
    }
  },
}).toJSON();
