const express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    cookies = require("cookie-parser"),
    cors = require('cors'),
    { graphqlHTTP } = require('express-graphql');


let schema = require('../graphql/schema');
const {authorization} = require("../graphql/auth");


module.exports = function () {
    //Create the Express application object
    const app = express();
    //the process.env property allows you to access predefined environment variables 
    //such as NODE_ENV
    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(cookies());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //configure GraphQL to use over HTTP
    // app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    app.use('*', cors());

    const {authorization} = require("../graphql/auth");
    app.use(authorization);
    app.use('/graphql', cors(), graphqlHTTP({
        schema: schema,
        rootValue: global,
        graphiql: true,
    }));

    // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
    app.use(methodOverride());//handle the use of PUT or DELETE methods
    //override with POST having ?_method=DELETE or ?_method=PUT in HTML code
    app.use(methodOverride('_method'));
    //saveUninitialized - forces a session that is "uninitialized" to be saved to the store
    //resave - forces the session to be saved back to the session store
    // Configure the 'session' middleware
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: process.env.SESSION_SECRET
    }));
    //Configure Express to use EJS module as the default template engine
    // Set the application view engine and 'views' folder
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    return app;
}