const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "ready",
    async execute(client) {
        const [data, err] = await client.pool.query("SELECT `beskedid`, `verifychannel` FROM verify WHERE verifychannel = ?", ["1011764042047688815"]);

        let beskedid = data[0].beskedid;
        let TicketChannel = client.channels.cache.get(data[0].ticketkanal);
        function sendTicketMSG() {
            const Ticketembed = new EmbedBuilder().setTitle("Kontakt fnalte").setDescription(config.TicketMessage).setColor(client.color).setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: "Fnalte ticket system",
            });

            const button = new ButtonBuilder().setCustomId("open-ticket").setLabel("Opret ticket").setStyle(ButtonStyle.Primary);

            TicketChannel.send({
                embeds: [Ticketembed],
                components: [new ActionRowBuilder().addComponents(button)],
            }).then(async (msg) => {
                await client.pool.query("UPDATE ticketsystem SET beskedid = ?", [msg.id]);
            });
        }

        TicketChannel.messages.delete(beskedid).then(() => {
            sendTicketMSG(TicketChannel);
        });
    },
};
