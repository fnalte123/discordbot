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
            .then(() => {
                client.pool.getConnection(async (err, connection) => {
                    if (err) throw err; // not connected!
                    connection.query("UPDATE ticketsystem SET ticketkanal = ?", [interaction.channel.id], (err, data) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                    connection.release();
                    if (err) throw err;
                });
            });
    },
};
