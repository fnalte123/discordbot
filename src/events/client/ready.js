const chalk = require("chalk");

const { channel } = require("diagnostics_channel");

module.exports = {
  name: "ready",
  once: "true",
  async execute(client) {
    client.user.setActivity(`Europa life`, { type: 3 }); // Sætter activity

    client.user.setStatus("online"); // Sætter botten som online

    console.log(chalk.green("[Database]: Forbindelse oprettet!")); // Skriver i console at databasen er online!

    chalk.cyan(`${client.user.username} Er nu online!`); // Skriver i console at vi er online!
  },
};
