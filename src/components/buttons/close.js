const { channel } = require("diagnostics_channel");
const config = require("../../config.json");

module.exports = {
    data: {
        name: `close-ticket`,
    },
    async execute(interaction, client) {
        setTimeout(() => {
            interaction.channel.delete();
        }, 10 * 500);
        return interaction.reply({
            ephemeral: true,
            content: "Du lukkede din ticket!",
        });
    },
};
