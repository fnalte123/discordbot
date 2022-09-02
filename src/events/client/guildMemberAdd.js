const chalk = require("chalk");

module.exports = {
    name: "guildMemberAdd",
    async execute(member, client) {
        const discordid = member.id;
        const discordname = member.user.tag;

        const [data, err] = await client.pool.query("SELECT userid FROM money WHERE userid = ?", [discordid]);
        if (!data.length) {
            await client.pool.query(`INSERT INTO money (userid, discordname) VALUES (?, ?)`, [discordid, discordname]);
            let channel = client.channels.cache.get(db.welcomechannel);
            channel.send("*Velkommen til serveren brormand, <@" + member + ">!*");
        } else {
            let channel = client.channels.cache.get(db.welcomechannel);
            channel.send("*Velkommen til serveren brormand, <@" + member + ">!*");
        }
    },
};
