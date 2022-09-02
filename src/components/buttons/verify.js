const config = require("../../config.json");

module.exports = {
  data: {
    name: `verify`,
  },
  async execute(interaction, client) {
    var guild = client.guilds.cache.get(config.guildid);
    const member = await guild.members.fetch(interaction.user.id);
    await member.roles.add(config.verifyrolle);
    return interaction.reply({
      ephemeral: true,
      content: "Velkommen til serveren!",
    });
  },
};
