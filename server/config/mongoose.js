let mongoose = require('mongoose')

module.exports = function () {
    // Set up MongoDb Connection
    let db = mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true
    }).then(() => console.log('MongoDB Connected Successfully!'))
        .catch((e) => console.log('DB Connection Error: ' + e))

    // Return DB Connection
    return db;
}