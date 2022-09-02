const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tissemand")
    .setDescription("Hvor lang er din tissemand?"),

  async execute(interaction, client) {
    const interactionUser = await interaction.guild.members.fetch(
      interaction.user.id
    );

    let amount = Math.round(Math.random() * (1 - 20) + 20);
    let size = "=".repeat(amount);

    //Laver et embed
    const embed = new EmbedBuilder()
      .setTitle("Tissemands måler")
      .addFields({
        name:
          interactionUser.user.username +
          `'s tissemand er ${amount} cm lang og ser sådan her ud:`,
        value: "`8" + size + "D`",
      })
      .setTimestamp(Date.now())
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.username+ ' | Lavet af Fnalte'
      })
      .setColor(client.color);

    //Sender beskeden efter commanden er brugt!
    await interaction.reply({
      embeds: [embed],
    });
  },
};
