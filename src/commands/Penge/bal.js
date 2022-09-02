const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bal")
        .setDescription("Se hvor mange penge du har!")
        .addStringOption((option) => option.setName("bruger").setDescription("Bruger").setRequired(false)),
    async execute(interaction, client) {
        const discordid = interaction.user.id;
        const [data, err] = await client.pool.query("SELECT * FROM money WHERE userid = ?", [discordid]);
        var vinder = interaction.options.getString("bruger");
        if (!vinder) {
            var vinder = interaction.user.username;
        }
        const balance = new EmbedBuilder()
            .setTitle("Penge")
            .setDescription(vinder + " har: **" + data[0].balance + "** DKK på kortet")
            .setColor(client.color)
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.username + " | Lavet af Fnalte",
            });
        await interaction.reply({
            embeds: [balance],
        });
    },
};
