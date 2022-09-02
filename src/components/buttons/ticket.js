const config = require("../../config.json");

module.exports = {
  data: {
    name: `open-ticket`,
  },
  async execute(interaction, client) {
    return interaction.reply({
      ephemeral: true,
      content: "Du oprettede en ticket!",
    });
  },
};
