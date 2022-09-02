const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        const discordid = interaction.member.id;
        const { member, guild } = interaction;
        const id = Math.floor(Math.random() * 90000) + 10000;
        let everyoneid = guild.roles.everyone.id;
        if (interaction.customId == "open-ticket") {
            const [data, err] = await client.pool.query("SELECT * FROM tickets WHERE discordid = ?", [discordid]);
            if (data.length > 0) {
                console.log("Du åbnede en ticket!");
                await interaction.guild.channels
                    .create({
                        name: `${member.user.username}` + "-" + `${id}`,
                        type: ChannelType.GuildText,
                        parent: "1014555138024804524",
                        permissionOverwrites: [
                            {
                                id: member.id,
                                allow: ["ViewChannel", "SendMessages"],
                            },
                            {
                                id: everyoneid,
                                deny: ["ViewChannel"],
                            },
                        ],
                    })
                    .then(async (channel) => {
                        const embed = new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(`Hey ${member}! beskriv dit problem her`)
                            .setFooter({
                                iconURL: client.user.displayAvatarURL(),
                                text: client.user.username + " | Lavet af Fnalte",
                            });
                        const closeButton = new ButtonBuilder().setCustomId("close-ticket").setLabel("Luk").setStyle(ButtonStyle.Primary);
                        channel.send({
                            embeds: [embed],
                            components: [new ActionRowBuilder().addComponents(closeButton)],
                        });
                    });
            } else {
                console.log("Du har allerede en ticket åben!");
            }
        }
    },
};
