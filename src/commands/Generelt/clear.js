const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Sletter x antal beskeder.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption((option) => option.setName("amount").setDescription("Antal beskeder der skal slettes.").setRequired(true)),

    async execute(interaction, client) {
        var amount = interaction.options.getInteger("amount");
        if (amount < 100 || amount > 0) {
            await interaction.channel.bulkDelete(amount, true);
            const succesEmbed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`🧹 Slettede ${amount} beskeder.`)
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: client.user.username + " | Lavet af Fnalte",
                });
            await interaction.reply({
                embeds: [succesEmbed],
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, 3500);
        } else {
            const loserEmbed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`🧹 Du kan ikke slette mere end 100 beskeder.`)
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: client.user.username + " | Lavet af Fnalte",
                });
            await interaction.reply({
                embeds: [loserEmbed],
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, 3500);
        }
    },
};
