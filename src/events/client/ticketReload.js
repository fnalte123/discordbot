const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "ready",
    async execute(client) {
        client.pool.getConnection(async (err, connection) => {
            if (err) throw err; // not connected!
            connection.query("SELECT * FROM ticketsystem ?", [userId], (err, row2) => {
                if (err) {
                    console.error(err);
                }
                connection.release();
                if (err) throw err;
                let beskedid = data[0].beskedid;
                let TicketChannel = client.channels.cache.get(row2[0].ticketkanal);
                function sendTicketMSG() {
                    const Ticketembed = new EmbedBuilder().setTitle("Kontakt fnalte").setDescription(config.TicketMessage).setColor(client.color).setFooter({
                        iconURL: client.user.displayAvatarURL(),
                        text: "Fnalte ticket system",
                    });

                    const button = new ButtonBuilder().setCustomId("open-ticket").setLabel("Opret ticket").setStyle(ButtonStyle.Primary);

                    TicketChannel.send({
                        embeds: [Ticketembed],
                        components: [new ActionRowBuilder().addComponents(button)],
                    }).then((msg) => {
                        client.pool.getConnection(async (err, connection) => {
                            if (err) throw err; // not connected!
                            connection.query("UPDATE ticketsystem SET beskedid = ?", [msg.id], (err, data) => {
                                if (err) {
                                    console.error(err);
                                }
                                console.log("data:", data);
                            });
                            connection.release();
                            if (err) throw err;
                        });
                    });
                }

                TicketChannel.messages.delete(beskedid).then(() => {
                    sendTicketMSG(TicketChannel);
                });
            });
        });
    },
};
