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

// var idMap = {}
// let map_response = null
//   new Promise(async (resolve, reject) => {
//     try {
//       map_response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
//         headers: {
//           'X-CMC_PRO_API_KEY': apiKey
//         }
//       })
//     } catch (ex) {
//       response = null
//       // error
//       console.log(ex)
//       reject(ex)
//     }
//     if (response) {
//       // success
//       const json = response.data
//       const string = JSON.stringify(json)
//       const data = JSON.parse(string)

//       resolve(json)
//     }
// })

client.on("message", async (msg) => {
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
                    const price = getPrice(data, cryptSymbol);
                    let priceString = price.toString();
                    msg.reply(priceString);
                    resolve(json);
                }
            });
        }
        if (msg.content.slice(0, 3) === "add") {
            const cryptSymbol = msg.content.slice(4, 7);
            await coins.updateCoinValue(cryptSymbol, apiKey);
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
    () => {
        client.on("messageCreate", async (msg) => {
            allCryptoSymbols = await coins.getAll();
            for (let cryptSymbol of allCryptoSymbols) {
                coinSymbol = cryptSymbol.coin;
                new Promise(async (resolve, reject) => {
                    try {
                        var response = await coins.updateCoinValue(
                            coinSymbol,
                            apiKey
                        );
                    } catch (ex) {
                        // error
                        console.log(ex);
                        reject(ex);
                    }
                    if (response) {
                        console.log("successful update");
                    }
                });
            }
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

// cron.schedule(
//     "1 0 0 1 * *",
//     () => {
//         client.on("messageCreate", async (msg) => {
//             allCryptoSymbols = ["ETH", "BTC"]; // TODO: `populate the array with all the cryptocurrencies currently being tracked in the database.
//             //pseudocode: allCryptoSymbols = MongoDB.cryptoSymbols;
//             for (let cryptSymbol in allCryptoSymbols) {
//                 let response = null;
//                 new Promise(async (resolve, reject) => {
//                     try {
//                         response = await axios.get(
//                             "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
//                             {
//                                 params: { symbol: cryptSymbol },
//                                 headers: {
//                                     "X-CMC_PRO_API_KEY": apiKey,
//                                 },
//                             }
//                         );
//                     } catch (ex) {
//                         response = null;
//                         // error
//                         console.log(ex);
//                         reject(ex);
//                     }
//                     if (response) {
//                         // success
//                         const json = response.data;
//                         const string = JSON.stringify(json);
//                         const data = JSON.parse(string);
//                         const price = getPrice(data, cryptSymbol);
//                         let priceString = price.toString();
//                         allCryptoPrices.push({
//                             cryptSymbol: priceString,
//                         });
//                         resolve(json);
//                     }
//                 });
//             }
//             // TODO: `the array allCryptoPrices hold all of the json data with the price
//             //        of the cryptocurrencies as well as the cryptocurrencies symbol
//             //        This function get's called at 12 am which means it hold the starting value of all cryptocurrencies
//             //        At the start of the day
//         });
//     },
//     {
//         scheduled: true,
//         timezone: localtz,
//     }
// );

// /*
// The code below will run whatever is in the first bracket at 12am
// every single month.
// The timezone of the user will be grabbed at the beginning of the file.
// */

// cron.schedule(
//     "1 0 0 * * 1 ",
//     () => {
//         client.on("messageCreate", async (msg) => {
//             allCryptoSymbols = ["ETH", "BTC"]; // TODO: `populate the array with all the cryptocurrencies currently being tracked in the database.
//             //pseudocode: allCryptoSymbols = MongoDB.cryptoSymbols;
//             for (let cryptSymbol in allCryptoSymbols) {
//                 let response = null;
//                 new Promise(async (resolve, reject) => {
//                     try {
//                         response = await axios.get(
//                             "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
//                             {
//                                 params: { symbol: cryptSymbol },
//                                 headers: {
//                                     "X-CMC_PRO_API_KEY": apiKey,
//                                 },
//                             }
//                         );
//                     } catch (ex) {
//                         response = null;
//                         // error
//                         console.log(ex);
//                         reject(ex);
//                     }
//                     if (response) {
//                         // success
//                         const json = response.data;
//                         const string = JSON.stringify(json);
//                         const data = JSON.parse(string);
//                         const price = getPrice(data, cryptSymbol);
//                         let priceString = price.toString();
//                         allCryptoPrices.push({
//                             cryptSymbol: priceString,
//                         });
//                         resolve(json);
//                     }
//                 });
//             }
//             // TODO: `the array allCryptoPrices hold all of the json data with the price
//             //        of the cryptocurrencies as well as the cryptocurrencies symbol
//             //        This function get's called at 12 am which means it hold the starting value of all cryptocurrencies
//             //        At the start of the day
//         });
//     },
//     {
//         scheduled: true,
//         timezone: localtz,
//     }
// );

const getPrice = async (cryptSymbol) => {
    try {
        await coins.updateCoinValue(cryptSymbol, apiKey);
        let data = await coins.getCoin(cryptSymbol).presentValue;
        console.log(data);
        return data;
    } catch (ex) {
        console.log(ex);
    }
};

client.login(process.env.BOT_TOKEN);
