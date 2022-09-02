const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const { channel } = require("diagnostics_channel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Sætter ticket kanalen i databasen!"),

    async execute(interaction, client) {
        await interaction
            .reply({
                content: "Du satte ticket kanalen!",
                ephemeral: true,
            })
            .then(async () => {
                await client.pool.query("UPDATE ticketsystem SET ticketkanal = ?", [interaction.channel.id]);
            });
    },
};
