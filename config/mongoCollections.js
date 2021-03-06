const dbConnection = require("./mongoConnection");

const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection.connectToDb();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

//list collections below
module.exports = {
    userPrefs: getCollectionFn("userPrefs"),
    coins: getCollectionFn("coins"),
};
