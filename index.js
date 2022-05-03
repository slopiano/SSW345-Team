// Run dotenv
require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron"); //This is for scheduling a task to run at a specific time
var moment = require("moment-timezone"); //Package to grab users timezone
const { userPrefs, coins } = require("./data");
const localtz = moment.tz.guess(); //Grabs the users timezone

const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}); //Connects to discord

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`); //Starts discord connection
});

const apiKey = process.env.CRYPTO_API;

client.on("messageCreate", async (msg) => {
    if (msg.content.length > 6) {
        if (msg.content.slice(0, 3) === "get") {
            const cryptSymbol = msg.content.slice(4, 7);
            let response = null;
            new Promise(async (resolve, reject) => {
                try {
                    response = await axios.get(
                        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
                        {
                            params: { symbol: cryptSymbol },
                            headers: {
                                "X-CMC_PRO_API_KEY": apiKey,
                            },
                        }
                    );
                } catch (ex) {
                    response = null;
                    // error
                    console.log(ex);
                    msg.reply(ex);
                    reject(ex);
                    console.log(msg.content.slice(0, 3));
                    console.log(msg.content.slice(4, 7));
                }
                if (response) {
                    // success
                    const json = response.data;
                    const string = JSON.stringify(json);
                    const data = JSON.parse(string);
                    let price =
                        data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    let allCryptoSymbols = await coins.getAll();
                    allCryptoSymbols.forEach((crypto) =>
                        console.log(crypto.coin)
                    );
                    msg.reply(priceString);
                    resolve(json);
                }
            });
        }
        if (msg.content.slice(0, 3) === "add") {
            const cryptSymbol = msg.content.slice(4, 7);
            let response = null;
            new Promise(async (resolve, reject) => {
                try {
                    response = await axios.get(
                        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
                        {
                            params: { symbol: cryptSymbol },
                            headers: {
                                "X-CMC_PRO_API_KEY": apiKey,
                            },
                        }
                    );
                } catch (ex) {
                    response = null;
                    // error
                    console.log(ex);
                    msg.reply(ex);
                    reject(ex);
                    console.log(msg.content.slice(0, 3));
                    console.log(msg.content.slice(4, 7));
                }
                if (response) {
                    // success
                    const json = response.data;
                    const string = JSON.stringify(json);
                    const data = JSON.parse(string);
                    let price =
                        data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    console.log(priceString);
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "daily",
                        priceString
                    );
                    msg.reply(priceString);
                    resolve(json);
                }
            });
        }
    }
});

/*
The code below will run whatever is in the first bracket at 12am
every single day.
The timezone of the user will be grabbed at the beginning of the file.
*/
const allCryptoSymbols = [];
var allCryptoPrices = [];

cron.schedule(
    "1 0 0 * * * ",
    async () => {
        allCryptoSymbols = await coins.getAll().map((coin) => coin.coin);
        for (let cryptSymbol in allCryptoSymbols) {
            let response = null;
            new Promise(async (resolve, reject) => {
                try {
                    response = await axios.get(
                        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
                        {
                            params: { symbol: cryptSymbol },
                            headers: {
                                "X-CMC_PRO_API_KEY": apiKey,
                            },
                        }
                    );
                } catch (ex) {
                    response = null;
                    // error
                    console.log(ex);
                    reject(ex);
                    console.log(msg.content.slice(0, 3));
                    console.log(msg.content.slice(4, 7));
                }
                if (response) {
                    // success
                    const json = response.data;
                    const string = JSON.stringify(json);
                    const data = JSON.parse(string);
                    let price =
                        data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "daily",
                        priceString
                    );
                    resolve(json);
                }
            });
        }
    },
    {
        scheduled: true,
        timezone: localtz,
    }
);

cron.schedule(
    "00 49 11 * * *",
    async () => {
        console.log("this is updating");
        let allCryptoSymbols = await coins.getAll();
        allCryptoSymbols.forEach((cryptSymbol) => {
            let response = null;
            new Promise(async (resolve, reject) => {
                try {
                    response = await axios.get(
                        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
                        {
                            params: { symbol: cryptSymbol },
                            headers: {
                                "X-CMC_PRO_API_KEY": apiKey,
                            },
                        }
                    );
                } catch (ex) {
                    response = null;
                    // error
                    console.log(ex);
                    reject(ex);
                    console.log(msg.content.slice(0, 3));
                    console.log(msg.content.slice(4, 7));
                }
                if (response) {
                    // success
                    const json = response.data;
                    const string = JSON.stringify(json);
                    const data = JSON.parse(string);
                    let price =
                        data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "daily",
                        priceString
                    );
                    resolve(json);
                }
            });
        });
    },
    {
        scheduled: true,
        timezone: localtz,
    }
);

/*
The code below will run whatever is in the first bracket at 12am
every single month.
The timezone of the user will be grabbed at the beginning of the file.
*/
cron.schedule(
    "1 0 0 1 * *",
    async () => {
        allCryptoSymbols = await coins.getAll().map((coin) => coin.coin);
        for (let cryptSymbol in allCryptoSymbols) {
            let response = null;
            new Promise(async (resolve, reject) => {
                try {
                    response = await axios.get(
                        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
                        {
                            params: { symbol: cryptSymbol },
                            headers: {
                                "X-CMC_PRO_API_KEY": apiKey,
                            },
                        }
                    );
                } catch (ex) {
                    response = null;
                    // error
                    console.log(ex);
                    reject(ex);
                    console.log(msg.content.slice(0, 3));
                    console.log(msg.content.slice(4, 7));
                }
                if (response) {
                    // success
                    const json = response.data;
                    const string = JSON.stringify(json);
                    const data = JSON.parse(string);
                    let price =
                        data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "monthly",
                        priceString
                    );
                    resolve(json);
                }
            });
        }
    },
    {
        scheduled: true,
        timezone: localtz,
    }
);

// /*
// The code below will run whatever is in the first bracket at 12am
// every single week.
// The timezone of the user will be grabbed at the beginning of the file.
// */

cron.schedule(
    "1 0 0 * * 1 ",
    async () => {
        allCryptoSymbols = await coins.getAll().map((coin) => coin.coin);
        for (let cryptSymbol in allCryptoSymbols) {
            let response = null;
            new Promise(async (resolve, reject) => {
                try {
                    response = await axios.get(
                        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
                        {
                            params: { symbol: cryptSymbol },
                            headers: {
                                "X-CMC_PRO_API_KEY": apiKey,
                            },
                        }
                    );
                } catch (ex) {
                    response = null;
                    // error
                    console.log(ex);
                    reject(ex);
                    console.log(msg.content.slice(0, 3));
                    console.log(msg.content.slice(4, 7));
                }
                if (response) {
                    // success
                    const json = response.data;
                    const string = JSON.stringify(json);
                    const data = JSON.parse(string);
                    let price =
                        data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "weekly",
                        priceString
                    );
                    resolve(json);
                }
            });
        }
    },
    {
        scheduled: true,
        timezone: localtz,
    }
);

client.login(process.env.BOT_TOKEN);
