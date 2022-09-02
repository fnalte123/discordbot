const chalk = require("chalk");

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client) {
        const discordid = member.id;
        const discordname = member.user.tag;
        client.pool.getConnection(async (err, connection) => {
            if (err) throw err; // not connected!
            connection.query("SELECT userid FROM money WHERE userid = ?", [discordid], async (err, data) => {
                if (err) {
                    console.error(err);
                }
                if (err) throw err;
                if (!data.lenght) {
                    connection.query(`INSERT INTO money (userid, discordname) VALUES (?, ?)`, [discordid, discordname]);
                    let channel = client.channels.cache.get(db.welcomechannel);
                    channel.send("*Velkommen til serveren brormand, <@" + member + ">!*");
                } else {
                    let channel = client.channels.cache.get(db.welcomechannel);
                    channel.send("*Velkommen til serveren brormand, <@" + member + ">!*");
                }
            });
            connection.release();
        });
    },
};
