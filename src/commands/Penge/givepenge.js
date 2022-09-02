const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("givpenge")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Giv penge til bruger!")
        .addStringOption((option) => option.setName("bruger").setDescription("Brugeren du vil give penge").setRequired(true))
        .addStringOption((option) => option.setName("penge").setDescription("Hvor mange penge vil du give?").setRequired(true)),
    async execute(interaction, client) {
        const discordid = interaction.user.id;
        client.pool.getConnection(async (err, connection) => {
            if (err) throw err; // not connected!
            connection.query("SELECT * FROM money WHERE userid = ?", [discordid], async (err, data) => {
                if (err) {
                    console.error(err);
                }
            });
            if (err) throw err;
            let vinder = interaction.options.getString("bruger");
            let penge = interaction.options.getString("penge");
            let npenge = row[0].balance;
            let total = Math.round(parseInt(penge) + parseInt(npenge));
            await interaction
                .reply({
                    ephemeral: true,
                    content: `Du gav ${vinder} ${penge} DKK`,
                })
                .then(() => {
                    connection.query("UPDATE money SET balance = ? WHERE userid = ?", [total, discordid]);
                    connection.release();
                });
        });
    },
};
