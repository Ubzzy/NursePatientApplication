var GraphQLSchema = require("graphql").GraphQLSchema;

var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLString = require("graphql").GraphQLString;

var User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { GraphQLBoolean } = require("graphql");
const JWT_SECRET = "some_secret_key";
const jwtExpirySeconds = 300;

const userType = new GraphQLObjectType({
    name: "user",
    fields: function () {
        return {
            _id: {
                type: GraphQLString,
            },
            firstName: {
                type: GraphQLString,
            },
            lastName: {
                type: GraphQLString,
            },
            email: {
                type: GraphQLString,
            },
            password: {
                type: GraphQLString,
            },
            isNurse: {
                type: GraphQLBoolean,
            },
            token: {
                type: GraphQLString,
            },
        };
    },
});

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: function () {
        return {
            user: {
                type: userType,
                args: {
                    id: {
                        name: "_id",
                        type: GraphQLString,
                    },
                },
                resolve: function (root, params) {
                    const user = User.findById(params.id).exec();
                    if (!user) {
                        throw new Error("Error");
                    }
                    return user;
                },
            },
            //
        };
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: function () {
        return {
            loginUser: {
                type: userType,
                args: {
                    email: {
                        name: "email",
                        type: GraphQLString,
                    },
                    password: {
                        name: "password",
                        type: GraphQLString,
                    },
                },

                resolve: async function (root, params, context) {
                    // find the user with email if exists
                    const user = await User.findOne({
                        email: params.email,
                    }).exec();

                    if (!user) {
                        throw new Error("Error - user not found");
                    }
                    // check if the password is correct
                    bcrypt.compare(params.password, user.password, (err, result) => {
                        if (err) {
                            throw err;
                        } else if (!result) {
                            console.log("Password doesn't match!");
                        } else {
                            console.log("Password matches!");
                        }
                    });
                    // sign the given payload (arguments of sign method) into a JSON Web Token
                    // and which expires 300 seconds after issue
                    const token = jwt.sign(
                        {
                            _id: user._id,
                            email: user.email,
                        },
                        JWT_SECRET,
                        { algorithm: "HS256", expiresIn: jwtExpirySeconds }
                    );
                    console.log("registered token:", token);

                    // set the cookie as the token string, with a similar max age as the token
                    // here, the max age is in milliseconds
                    context.res.cookie("token", token, {
                        maxAge: jwtExpirySeconds * 1000,
                        httpOnly: true,
                    });
                    //context.res.status(200).send({ screen: user.username });
                    return user;
                }, //end of resolver function
            },
        };
    },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
