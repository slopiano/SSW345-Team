// Run dotenv
require("dotenv").config();
const axios = require("axios");
const cron = require("node-cron"); //This is for scheduling a task to run at a specific time
var moment = require("moment-timezone"); //Package to grab users timezone
const { userPrefs, coins } = require("./data");
const localtz = moment.tz.guess(); //Grabs the users timezone

const { Client, Intents, Message } = require("discord.js");
const { getCoinByName } = require("./data/coins");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}); //Connects to discord

let channelID = '967448536918655099';

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`); //Starts discord connection
});

const apiKey = process.env.CRYPTO_API;

function getPercentageChange(p1, p2) {
    if(p1 > p2){
        let answer = (((p1/p2)-1)*100).toFixed(2)
        return answer.toString()
    }
    else if(p1 < p2){
        let answer = (((p2/p1)-1)*100).toFixed(2)
        answer = answer.toString()
        return "-" + answer
    }
    else{
        return '0';
    }
}

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
                    msg.reply(priceString);
                    resolve(json);
                }
            });
        }

        if (msg.content.slice(0, 3) === "pcd") {
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
                    let coin = await getCoinByName(cryptSymbol)
                    let priceDaily = Number(coin['dailyValue'])
                    let percentage = getPercentageChange(price, priceDaily)
                    msg.reply(cryptSymbol + "'s daily change is " + percentage + "%");
                    resolve(json);
                }
            });
        }

        if (msg.content.slice(0, 3) === "pcw") {
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
                    let coin = await getCoinByName(cryptSymbol)
                    let priceDaily = Number(coin['weeklyValue'])
                    let percentage = getPercentageChange(price, priceDaily)
                    msg.reply(cryptSymbol + "'s weekly change is " + percentage + "%");
                    resolve(json);
                }
            });
        }

        if (msg.content.slice(0, 3) === "pcm") {
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
                    let coin = await getCoinByName(cryptSymbol)
                    let priceDaily = Number(coin['monthlyValue'])
                    let percentage = getPercentageChange(price, priceDaily)
                    msg.reply(cryptSymbol + "'s monthly change is " + percentage + "%");
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
    if (msg.content === "update all daily value"){
        var allCryptoSymbols = await coins.getAll()
        for (var x=0; x<allCryptoSymbols.length; x++){
            console.log(allCryptoSymbols[x]['coin'])
            let cryptSymbol = allCryptoSymbols[x]['coin']
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
                }
                if (response) {
                    // success
                    const json = response.data;
                    const string = JSON.stringify(json);
                    const data = JSON.parse(string);
                    let price = data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    console.log(priceString);
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "daily",
                        priceString
                    );
                    await client.channels.cache.get(channelID).send("Updated "+ cryptSymbol + "'s daily value to " + priceString)
                    resolve(json);
                }
            });
        }
    }
    if(msg.content === 'test'){
        let coin = await getCoinByName('BTC')
        console.log(coin['dailyValue']);
    }

    if( msg.content === 'total report'){
        //await client.channels.cache.get(channelID).send("Your total report:\n")
        var allCryptoSymbols = await coins.getAll()
        for (var x=0; x<allCryptoSymbols.length; x++){
            console.log(allCryptoSymbols[x]['coin']);
            let cryptSymbol = allCryptoSymbols[x]['coin']
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
                }
                if (response) {
                    // success
                    const json = response.data;
                    const string = JSON.stringify(json);
                    const data = JSON.parse(string);
                    let price = data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let coin = await getCoinByName(cryptSymbol)
                    let priceDaily = Number(coin['dailyValue'])
                    let priceWeekly = Number(coin['weeklyValue'])
                    let priceMonthly = Number(coin['monthlyValue'])
                    let percentageDaily = getPercentageChange(price, priceDaily)
                    let percentageWeekly = getPercentageChange(price, priceWeekly)
                    let percentageMonthly = getPercentageChange(price, priceMonthly)
                    await msg.reply(cryptSymbol + "'s daily change: " + percentageDaily +"%\n" + cryptSymbol + "'s weekly change: " + percentageWeekly +"%\n" + cryptSymbol + "'s monthly change: " + percentageMonthly +"%\n")
                    resolve(json);
                }
            });
        }
    }
    if(msg.content ==='!help')
  {
    msg.reply("Commands:\nget [coin abreviation] - returns the current price of the coin\nadd [coin abreviation] - add coin to profile to keep track of.")
  
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
    "1 0 0 * * *",
    async () => {
        console.log("this is updating");
        var allCryptoSymbols = await coins.getAll()
        console.log(allCryptoSymbols);
        for (var x=0; x<allCryptoSymbols.length; x++){
            console.log(allCryptoSymbols[x]['coin'])
            let cryptSymbol = allCryptoSymbols[x]['coin']
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
                    let price = data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    console.log(priceString);
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "daily",
                        priceString
                    );
                    await client.channels.cache.get(channelID).send("Updated "+ cryptSymbol + "'s daily value to " + priceString)
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
    "00 13 16 * * *",
    async () => {
        console.log("this is updating");
        var allCryptoSymbols = await coins.getAll()
        console.log(allCryptoSymbols);
        for (var x=0; x<allCryptoSymbols.length; x++){
            console.log(allCryptoSymbols[x]['coin'])
            let cryptSymbol = allCryptoSymbols[x]['coin']
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
                    let price = data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    console.log(priceString);
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "daily",
                        priceString
                    );
                    await client.channels.cache.get(channelID).send("Updated "+ cryptSymbol + "'s daily value to " + priceString)
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

/*
The code below will run whatever is in the first bracket at 12am
every single month.
The timezone of the user will be grabbed at the beginning of the file.
*/
cron.schedule(
    "1 0 0 1 * *",
    async () => {
        console.log("this is updating");
        var allCryptoSymbols = await coins.getAll()
        console.log(allCryptoSymbols);
        for (var x=0; x<allCryptoSymbols.length; x++){
            console.log(allCryptoSymbols[x]['coin'])
            let cryptSymbol = allCryptoSymbols[x]['coin']
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
                    let price = data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    console.log(priceString);
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "monthly",
                        priceString
                    );
                    await client.channels.cache.get(channelID).send("Updated "+ cryptSymbol + "'s monthly value to " + priceString)
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
        console.log("this is updating");
        var allCryptoSymbols = await coins.getAll()
        console.log(allCryptoSymbols);
        for (var x=0; x<allCryptoSymbols.length; x++){
            console.log(allCryptoSymbols[x]['coin'])
            let cryptSymbol = allCryptoSymbols[x]['coin']
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
                    let price = data["data"][cryptSymbol]["quote"]["USD"]["price"];
                    let priceString = price.toString();
                    console.log(priceString);
                    await coins.updateCoinValue(
                        cryptSymbol,
                        "weekly",
                        priceString
                    );
                    await client.channels.cache.get(channelID).send("Updated "+ cryptSymbol + "'s weekly value to " + priceString)
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
