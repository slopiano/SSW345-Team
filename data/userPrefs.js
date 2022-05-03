const mongoCollections = require("../config/mongoCollections");
const userPrefs = mongoCollections.userPrefs;
const { ObjectId } = require("mongodb");

const createUserPrefs = async (username, coins) => {
    if (typeof username !== "string" || username.trim().length === 0)
        throw "Invalid username inputted";

    if (!Array.isArray(coins)) throw "Invalid coins inputted";

    for (coin of coins) {
        if (typeof coin !== "string" || coin.trim().length === 0)
            throw "Invalid coin inputted";
    }
    const userPrefsCollection = await userPrefs();

    if ((await userPrefsCollection.findOne({ username: username })) !== null) {
        throw "User already exists";
    }

    const newUserPrefs = {
        username: username,
        coins: coins,
    };

    const insertInfo = await userPrefsCollection.insertOne(newUserPrefs);
    if (insertInfo.insertedCount === 0) throw "Could not add userPrefs";
    const newId = insertInfo.insertedId.toString();

    return await getUserPrefsById(newId);
};

const getUserPrefsById = async (id) => {
    if (!id || !ObjectId.isValid(id)) throw "No id or invalid ID provided";
    const userPrefsCollection = await userPrefs();
    const userPrefs = await userPrefsCollection.findOne({ _id: ObjectId(id) });
    if (userPrefs === null) throw "No userPrefs with that id";
    return userPrefs;
};

const getUserPrefsByUsername = async (username) => {
    if (typeof username !== "string" || username.trim().length === 0)
        throw "Invalid username inputted";
    const userPrefsCollection = await userPrefs();
    const userPrefs = await userPrefsCollection.findOne({ username: username });
    if (userPrefs === null) throw "No userPrefs with that username";
    return userPrefs;
};

const addCoin = async (username, coin) => {
    if (typeof username !== "string" || username.trim().length === 0)
        throw "Invalid username inputted";
    if (typeof coin !== "string" || coin.trim().length === 0)
        throw "Invalid coin inputted";
    if (!acceptedCoins.includes(coin)) throw "Invalid coin inputted";
    const userPrefsCollection = await userPrefs();
    const userPrefs = await userPrefsCollection.findOne({ username: username });
    if (userPrefs === null) throw "No userPrefs with that username";
    if (userPrefs.coins.includes(coin)) throw "Coin already in userPrefs";
    const updatedUserPrefs = await userPrefsCollection.updateOne(
        { username: username },
        { $push: { coins: coin } }
    );
    if (updatedUserPrefs.modifiedCount === 0) throw "Could not add coin";
    return await getUserPrefsByUsername(username);
};

const removeCoin = async (username, coin) => {
    if (typeof username !== "string" || username.trim().length === 0)
        throw "Invalid username inputted";
    if (typeof coin !== "string" || coin.trim().length === 0)
        throw "Invalid coin inputted";
    if (!acceptedCoins.includes(coin)) throw "Invalid coin inputted";
    const userPrefsCollection = await userPrefs();
    const userPrefs = await userPrefsCollection.findOne({ username: username });
    if (userPrefs === null) throw "No userPrefs with that username";
    if (!userPrefs.coins.includes(coin)) throw "Coin not in userPrefs";
    const updatedUserPrefs = await userPrefsCollection.updateOne(
        { username: username },
        { $pull: { coins: coin } }
    );
    if (updatedUserPrefs.modifiedCount === 0) throw "Could not remove coin";
    return await getUserPrefsByUsername(username);
};

const getCoinsFromUsername = async (username) => {
    if (typeof username !== "string" || username.trim().length === 0)
        throw "Invalid username inputted";
    const userPrefsCollection = await userPrefs();
    const userPrefs = await userPrefsCollection.findOne({ username: username });
    if (userPrefs === null) throw "No userPrefs with that username";
    return userPrefs.coins;
};

module.exports = {
    createUserPrefs,
    getUserPrefsByUsername,
    addCoin,
    removeCoin,
    getCoinsFromUsername,
};
