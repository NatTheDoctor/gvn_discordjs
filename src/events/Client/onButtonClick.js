const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");

module.exports = new Event({
  event: "interactionCreate",
  once: false,
  run: (__client__, interaction) => {
    if (interaction.isButton()) {
      let customId = interaction.component.data.custom_id;
      if (customId === "accept") {
        interaction.update("Đã chuyển khoản");
      }
    }
  },
}).toJSON();
