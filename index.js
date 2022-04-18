// Run dotenv
require("dotenv").config();

const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    if (msg.content === "ping") {
        msg.reply("pong");
    }
});

client.on("message", (msg) => {
    if (msg.content === "!help") {
        msg.reply("!help - Displays this message\nping - pong\n");
    }
});

client.login(process.env.BOT_TOKEN);
