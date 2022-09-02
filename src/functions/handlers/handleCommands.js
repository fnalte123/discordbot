const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const config = require("../../config.json");
module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands");
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} blev loaded!`);
            }
        }

        const clientId = config.clientid;
        const guildId = config.guildid;
        const rest = new REST({ version: "9" }).setToken(process.env.token);
        try {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
