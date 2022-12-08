let express = require('./server/config/express');
let mongoose = require('./server/config/mongoose');

require('dotenv').config();

let app = express();
let db = mongoose();
let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});

module.exports = app;