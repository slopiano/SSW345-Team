const mongoCollections = require("../config/mongoCollections");
const coins = mongoCollections.coins;
const userPrefs = mongoCollections.userPrefs;
const axios = require("axios");

const addCoin = async (coin) => {
    const coinCollection = await coins();
    const newCoinInfo = await coinCollection.insertOne(coin);
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

const updateCoinValue = async (coin, interval, value) => {
    console.log(coin);
    console.log(value);
    const coinCollection = await coins();
    const updateObj = {};
    if ((await coinCollection.findOne({ coin: coin })) === null) {
        await addCoin({
            coin: coin,
            dailyValue: value,
            weeklyValue: value,
            monthlyValue: value,
        });
    } else {
        if (interval === "daily") {
            updateObj.dailyValue = value;
        } else if (interval === "weekly") {
            updateObj.weeklyValue = value;
        } else if (interval === "monthly") {
            updateObj.monthlyValue = value;
        } else {
            throw "Invalid interval";
        }

        const updatedInfo = await coinCollection.updateOne(
            { coin: coin },
            { $set: updateObj }
        );

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
