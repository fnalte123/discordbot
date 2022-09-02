const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "ready",
    async execute(client) {
        client.pool.getConnection(async (err, connection) => {
            if (err) throw err; // not connected!
            connection.query("SELECT * FROM verify = ?", [userId], (err, data) => {
                if (err) {
                    console.error(err);
                }
                if (err) throw err;
                let beskedid = data[0].beskedid;
                let verifyChannel = client.channels.cache.get(data[0].verifychannel);
                verifyChannel.messages.delete(beskedid).then(() => {
                    const embed = new EmbedBuilder()
                        .setDescription(config.verifymessage)
                        .setColor(client.color)
                        .setFooter({
                            iconURL: client.user.displayAvatarURL(),
                            text: client.user.username + " | Lavet af Fnalte",
                        });
                    const button = new ButtonBuilder().setCustomId("verify").setLabel("Verify").setStyle(ButtonStyle.Secondary);
                    verifyChannel
                        .send({
                            embeds: [embed],
                            components: [new ActionRowBuilder().addComponents(button)],
                        })
                        .then((msg) => {
                            connection.query("UPDATE verify SET beskedid = ?", [msg.id], (err, data) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        });
                });
            });

            connection.release();
        });
    },
};
