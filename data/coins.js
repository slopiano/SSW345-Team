const mongoCollections = require("../config/mongoCollections");
const coins = mongoCollections.coins;
const userPrefs = mongoCollections.userPrefs;
const axios = require("axios");

const addCoin = async (coin, apiKey) => {
    let presentValue = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
        {
            params: { symbol: coin },
            headers: {
                "X-CMC_PRO_API_KEY": apiKey,
            },
        }
    );
    newCoin = {
        coin: coin,
        dailyValue: presentValue,
        weeklyValue: presentValue,
        monthlyValue: presentValue,
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

const updateCoinValue = async (coin, interval, apiKey) => {
    const coinCollection = await coins();
    if ((await coinCollection.findOne({ coin: coin })) === null) {
        await addCoin(coin, apiKey);
    } else {
        if (interval === "daily") {
            const updatedInfo = await coinCollection.updateOne(
                { coin: coin },
                {
                    $set: {
                        dailyValue: await axios.get(
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
        } else if (interval === "weekly") {
            const updatedInfo = await coinCollection.updateOne(
                { coin: coin },
                {
                    $set: {
                        weeklyValue: await axios.get(
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
        } else if (interval === "monthly") {
            const updatedInfo = await coinCollection.updateOne(
                { coin: coin },
                {
                    $set: {
                        monthlyValue: await axios.get(
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
        } else {
            throw "Invalid interval";
        }

        if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
            throw "Could not update coin";
    }
    return await getCoinByName(coin);
};

const getAll = async () => {
    const coinCollection = await coins();
    const coinList = await coinCollection.find({}).toArray();
    return coinList;
};

module.exports = {
    addCoin,
    getCoin,
    getCoinByName,
    updateCoinValue,
    getLastValue,
    getAll,
};
