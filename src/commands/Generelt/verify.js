const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

const { channel } = require("diagnostics_channel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Sætter verify kanalen i databasen!"),

    async execute(interaction, client) {
        await interaction
            .reply({
                content: "Du satte verify kanalen!",
                ephemeral: true,
            })
            .then(async () => {
                await client.pool.query("UPDATE verify SET verifychannel = ?", [interaction.channel.id]);
            });
    },
};
