// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

require('dotenv').config()
// Load the module dependencies
const configureMongoose = require("./server/config/mongoose");
const configureExpress = require("./server/config/express");
//
const {graphqlHTTP} = require("express-graphql");
var schema = require("./server/graphql/schema");
var cors = require("cors");
// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();


const corsOptions = {
    origin: ["http://localhost:3000"], //included origin as true
    credentials: true, //included credentials as true
};

// app.use(cors(corsOptions));

//configure GraphQL to use over HTTP
// app.use('*', cors());

//
// Use the Express application instance to listen to the '4000' port
app.listen(4000, () => console.log("Express GraphQL Server Now Running On http://localhost:4000/graphql"));

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
