require("dotenv").config();
const config = require("./config.json");
const { token, databaseToken } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const mysql = require('mysql2/promise');



const client = new Client({ intents: 131071 });
client.commands = new Collection();
client.commandArray = [];
client.buttons = new Collection();
client.color = "#36393F";

client.pool = mysql.createPool({
  host: `${process.env.MYSQLHOST}`,
  user: `${process.env.MYSQLUSER}`,
  password: `${process.env.MYSQLPASSWORD}`,
  database: `${process.env.MYSQLDATABASE}`,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
});

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
