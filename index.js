// Run dotenv
require('dotenv').config();
const axios = require('axios');

const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const api_key = process.env.CRYPTO_API

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
    let response = null;
    new Promise(async (resolve, reject) => {
    try {
        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': api_key,
        },
        });
    } catch(ex) {
        response = null;
        // error
        console.log(ex);
        msg.reply(ex);
        reject(ex);
    }
    if (response) {
        // success
        const json = response.data;
        console.log(json);
        resolve(json);
    }
    });
});

client.login(process.env.BOT_TOKEN);