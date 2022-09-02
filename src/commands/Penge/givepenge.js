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
        const [data, err] = await client.pool.query("SELECT * FROM money WHERE userid = ?", [discordid]);

        let vinder = interaction.options.getString("bruger");
        let penge = interaction.options.getString("penge");
        let npenge = data[0].balance;
        let total = Math.round(parseInt(penge) + parseInt(npenge));
        await interaction
            .reply({
                ephemeral: true,
                content: `Du gav ${vinder} ${penge} DKK`,
            })
            .then(async () => {
                await client.pool.query("UPDATE money SET balance = ? WHERE userid = ?", [total, discordid]);
            });
    },
};
