let mongoose = require("mongoose");

module.exports = function () {
    // Set up MongoDb Connection
    let db = mongoose
        .connect("mongodb+srv://Kunj:KunjCollege@cluster0.k3oag.mongodb.net/graphql-db", {
            useNewUrlParser: true,
        })
        .then(() => console.log("MongoDB Connected Successfully!"))
        .catch((e) => console.log("DB Connection Error: " + e));

    // Return DB Connection
    require("../models/User");
    return db;
};
