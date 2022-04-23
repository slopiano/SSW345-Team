const mongoCollections = require("../config/mongoCollections");
const coins = mongoCollections.coins;
const userPrefs = mongoCollections.userPrefs;
const axios = require("axios");

const addCoin = async (coin, apiKey) => {
    newCoin = {
        coin: coin,
        presentValue: await axios.get(
            "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
            {
                params: { symbol: coin },
                headers: {
                    "X-CMC_PRO_API_KEY": apiKey,
                },
            }
        ),
    };
    const coinCollection = await coins();
    const newCoinInfo = await coinCollection.insertOne(newCoin);
    if (!newCoinInfo) throw "Could not add coin";
    const newId = newCoinInfo.insertedId;
    return await getCoin(newId);
};

const getCoin = async (coinId) => {
    const coinCollection = await coins();
    const coin = await coinCollection.findOne({ _id: coinId });
    if (coin === null) throw "No coin with that id";
    return coin;
};

const getLastValue = async (coin) => {
    const coinCollection = await coins();
    const coinInfo = await coinCollection.findOne({ coin: coin });
    if (coinInfo === null) throw "No coin with that id";
    return coinInfo.presentValue;
};

const getCoinByName = async (name) => {
    const coinCollection = await coins();
    const coin = await coinCollection.findOne({ coin: name });
    if (coin === null) throw "No coin with that name";
    return coin;
};

const updateCoinValue = async (coin, apiKey) => {
    const coinCollection = await coins();
    const updatedInfo = await coinCollection.updateOne(
        { coin: coin },
        {
            $set: {
                presentValue: await axios.get(
                    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
                    {
                        params: { symbol: coin },
                        headers: {
                            "X-CMC_PRO_API_KEY": apiKey,
                        },
                    }
                ),
            },
        }
    );

    if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
        throw "Could not update coin";
    return await getCoinByName(coin);
};

module.exports = {
    addCoin,
    getCoin,
    getCoinByName,
    updateCoinValue,
    getLastValue,
};
