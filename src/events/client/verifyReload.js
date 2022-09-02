const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const config = require("../../config.json");
const { channel } = require("diagnostics_channel");

module.exports = {
  name: "ready",
  once: "true",
  async execute(client, interaction) {
    client.pool.getConnection(async (err, connection) => {
      if (err) throw err; // not connected!
      connection.query("SELECT * FROM verify = ?", [userId], (err, row2) => {
        if (err) {
          console.error(err);
        }
      });
      connection.release();
      if (err) throw err;
      let beskedid = row2[0].beskedid;
      let verifyChannel = client.channels.cache.get(row2[0].verifychannel);

      function sendVerifyMSG() {
        const embed = new EmbedBuilder()
          .setDescription(config.verifymessage)
          .setColor(client.color)
          .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.user.username + " | Lavet af Fnalte",
          });

        const button = new ButtonBuilder()
          .setCustomId("verify")
          .setLabel("Verify")
          .setStyle(ButtonStyle.Secondary);

        verifyChannel
          .send({
            embeds: [embed],
            components: [new ActionRowBuilder().addComponents(button)],
          })
          .then((msg) => {
            client.pool.getConnection(async (err, connection) => {
              if (err) throw err; // not connected!
              connection.query(
                "UPDATE verify SET beskedid = ?",
                [msg.id],
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
      }

      verifyChannel.messages.delete(beskedid).then(() => {
        sendVerifyMSG(verifyChannel);
      });
    });
  },
};
