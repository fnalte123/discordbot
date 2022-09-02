const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

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
      .then(() => {
        client.pool.getConnection(async (err, connection) => {
          if (err) throw err; // not connected!
          connection.query(
            "UPDATE verify SET verifychannel = ?",
            [interaction.channel.id],
            (err, data) => {
              if (err) {
                console.error(err);
              }
            }
          );
          connection.release();
          if (err) throw err;
        });
      });
  },
};
