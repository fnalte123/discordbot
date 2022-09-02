const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

const { channel } = require("diagnostics_channel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bal")
    .setDescription("Se hvor mange penge du har!")
    .addStringOption((option) =>
      option.setName("bruger").setDescription("Bruger").setRequired(false)
    ),

  async execute(interaction, client) {
    const discordid = interaction.user.id;
    client.pool.getConnection(async (err, connection) => {
      if (err) throw err; // not connected!
      connection.query(
        "SELECT * FROM money WHERE userid = ?",
        [discordid],
        async (err, data) => {
          if (err) {
            console.error(err);
          }

          connection.release();
          if (err) throw err;

          var vinder = interaction.options.getString("bruger");
          if (!vinder) {
            var vinder = interaction.user.username;
          }
          const balance = new EmbedBuilder()
            .setTitle("Penge")
            .setDescription(
              vinder + " har: **" + data[0].balance + "** DKK på kortet"
            )
            .setColor(client.color)
            .setFooter({
              iconURL: client.user.displayAvatarURL(),
              text: client.user.username + " | Lavet af Fnalte",
            });

          await interaction.reply({
            embeds: [balance],
          });
        }
      );
    });
  },
};
