const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

function updateBalance(total, id, client) {
    client.pool.getConnection(async (err, connection) => {
        if (err) throw err; // not connected!
        connection.query("UPDATE money SET balance = ? WHERE userid = ?", [total, id]);
        connection.release();
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gamble")
        .setDescription("Spil lortet væk!")
        .addStringOption((option) => option.setName("penge").setDescription("Antal penge du vil gamble").setRequired(true)),
    async execute(interaction, client) {
        const discordid = interaction.user.id;
        client.pool.getConnection(async (err, connection) => {
            if (err) throw err; // not connected!
            connection.query("SELECT * FROM money WHERE userid = ?", [discordid], async (err, data) => {
                if (err) {
                    console.error(err);
                }
                if (err) throw err;
                const indsats = interaction.options.getString("penge");
                const penge = data[0].balance;
                if (parseInt(penge) >= parseInt(indsats)) {
                    let chance = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
                    if (chance === "1" || chance === 1) {
                        let winamount = parseInt(indsats) * 2;
                        const win = new EmbedBuilder()
                            .setTitle("Tillykke")
                            .setDescription(`Du vandt ${winamount} DKK.`)
                            .setColor("#00FF00")
                            .setFooter({
                                iconURL: client.user.displayAvatarURL(),
                                text: client.user.username + " | Lavet af Fnalte",
                            });

                        await interaction
                            .reply({
                                embeds: [win],
                            })
                            .then(() => {
                                let total = Math.round(parseInt(data[0].balance) + parseInt(winamount));
                                updateBalance(total, interaction.user.id, client);
                            });
                    } else {
                        // Taber
                        const lose = new EmbedBuilder()
                            .setTitle("Øv, Du tabte :/")
                            .setDescription(`Du tabte desværre ${indsats} DKK.`)
                            .setColor("#ff0000")
                            .setFooter({
                                iconURL: client.user.displayAvatarURL(),
                                text: client.user.username + " | Lavet af Fnalte",
                            });
                        await interaction
                            .reply({
                                embeds: [lose],
                            })
                            .then(() => {
                                let total = Math.round(parseInt(data[0].balance) - parseInt(indsats));
                                updateBalance(total, interaction.user.id, client);
                            });
                    }
                } else
                    await interaction.reply({
                        content: "Du har ikke penge nok til dette!",
                        ephemeral: true,
                    });
            });
        });
    },
};
