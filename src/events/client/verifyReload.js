const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "ready",
    async execute(client) {
        const [data, err] = await client.pool.query("SELECT `beskedid`, `verifychannel` FROM verify WHERE verifychannel = ?", ["1011764042047688815"]);
        if (err) {
            console.error(err);
        }
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
                .then(async (msg) => {
                    await client.pool.query("UPDATE verify SET beskedid = ?", [msg.id]);
                });
        });
    },
};
