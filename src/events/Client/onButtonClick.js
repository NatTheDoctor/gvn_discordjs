const { success } = require("../../utils/Console");
const Event = require("../../structure/Event");

module.exports = new Event({
  event: "interactionCreate",
  once: false,
  run: (__client__, interaction) => {
    if (interaction.isButton()) {
      console.log(interaction.component.custom_id);
    }
  },
}).toJSON();
