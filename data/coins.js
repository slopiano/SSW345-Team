const mongoCollections = require("../config/mongoCollections");
const coins = mongoCollections.coins;
const userPrefs = mongoCollections.userPrefs;
const axios = require("axios");

const addCoin = async (coin) => {
    newCoin = {
        coin: coin,
        presentValue: await axios.get(),
    };
};
