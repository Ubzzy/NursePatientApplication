var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;

const moment = require('moment');

// Mongoose model
var User = require("../models/User");
var Tip = require("../models/Tip");
// Hashing password
const bcrypt = require("bcrypt");
// Token sessions
const jwt = require("jsonwebtoken");
const {GraphQLBoolean} = require("graphql");
const VitalInformation = require("../models/VitalInformation");

const JWT_SECRET = process.env.SECRET_KEY;
const jwtExpirySeconds = 600000; // 10mins

const userType = new GraphQLObjectType({
    name: "user",
    fields: function () {
        return {
            _id: {type: GraphQLString},
            firstName: {type: GraphQLString},
            lastName: {type: GraphQLString},
            email: {type: GraphQLString},
            password: {type: GraphQLString},
            isNurse: {type: GraphQLBoolean},
            token: {type: GraphQLString},
        };
    },
});
const tipType = new GraphQLObjectType({
    name: "tip",
    fields: function () {
        return {
            _id: {type: GraphQLString},
            message: {type: GraphQLString},
            createdBy: {type: GraphQLString}
        };
    },
});


const vitalInformation = new GraphQLObjectType({
    name: "vitalInformation",
    fields: function () {
        return {
            _id: {type: GraphQLString},
            user_id: {type: GraphQLString},
            date: {type: GraphQLString},
            cp: {type: GraphQLString},
            trestbps: {type: GraphQLString},
            chol: {type: GraphQLString},
            fps: {type: GraphQLString},
            restecg: {type: GraphQLString},
            thalch: {type: GraphQLString},
            exang: {type: GraphQLString},
            oldpeak: {type: GraphQLString},
            slope: {type: GraphQLString},
            thal: {type: GraphQLString},
            target: {type: GraphQLString}
        };
    },
});


const queryType = new GraphQLObjectType({
    name: "Query",
    fields: function () {
        return {
            users: {
                type: new GraphQLList(userType),
                resolve: function () {
                    const users = User.find()
                    if (!users) {
                        throw new Error('Users not found')
                    }
                    return users
                }
            },
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
            tips: {
                type: new GraphQLList(tipType),
                resolve: function () {
                    const tips = Tip.find()
                    if (!tips) {
                        throw new Error('Tips not found')
                    }
                    return tips
                }
            },
            tip: {
                type: tipType,
                args: {
                    id: {
                        name: "_id",
                        type: GraphQLString,
                    },
                },
                resolve: function (root, params) {
                    const tip = Tip.findById(params.id).exec();
                    if (!tip) {
                        throw new Error("Error");
                    }
                    return tip;
                },
            },
            records: {
                type: new GraphQLList(vitalInformation),
                resolve: function (root, params, context) {
                    if (!context.user || context.user.isNurse === true) {
                        throw new Error('not Authorized')
                    }

                    return VitalInformation.find({user_id: context.user._id});
                }
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
                    if (bcrypt.compareSync(params.password, user.password) == false) {
                        throw new Error("Invalid password");
                    }

                    // sign the given payload (arguments of sign method) into a JSON Web Token
                    // and which expires 300 seconds after issue
                    const token = jwt.sign(
                        {
                            _id: user._id,
                            email: user.email,
                        },
                        JWT_SECRET,
                        {algorithm: "HS256", expiresIn: jwtExpirySeconds}
                    );
                    console.log("registered token:", token);

                    // set the cookie as the token string, with a similar max age as the token
                    // here, the max age is in milliseconds

                    context.res.cookie("token", token, {
                        maxAge: jwtExpirySeconds * 1000,
                        httpOnly: true,
                    });


                    userObj = user.toJSON()
                    userObj.password = undefined
                    userObj.token = token

                    //context.res.status(200).send({ screen: user.username });
                    return userObj;
                }, //end of resolver function
            },
            // Tips mutation
            addTip: {
                type: tipType,
                args: {
                    message: {type: new GraphQLNonNull(GraphQLString)},
                    createdBy: {type: new GraphQLNonNull(GraphQLString)}
                },
                resolve: function (root, params, context) {
                    const tip = new Tip(params);
                    const newTip = tip.save();
                    if (!tip) {
                        throw new Error('Error');
                    }
                    return tip
                }
            },
            deleteTip: {
                type: tipType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const deleteTip = Tip.findByIdAndRemove(params.id).exec();
                    if (!deleteTip) {
                        throw new Error('Error while deleting tip from DB')
                    }
                    return deleteTip;
                }
            },
            updateTip: {
                type: tipType,
                args: {
                    _id: {name: '_id', type: new GraphQLNonNull(GraphQLString)},
                    message: {type: new GraphQLNonNull(GraphQLString)},
                    createdBy: {type: new GraphQLNonNull(GraphQLString)}

                },
                resolve(root, params) {
                    return Tip.findByIdAndUpdate(params._id, {
                        message: params.message,
                        createdBy: params.createdBy
                    }).then(console.log("Tip updated: " + params._id))
                        .catch(err => next(err))
                }
            },
            addVitalInformation: {
                type: vitalInformation,
                args: {
                    cp: {type: GraphQLString},
                    user_id: {type: GraphQLString},
                    trestbps: {type: GraphQLString},
                    chol: {type: GraphQLString},
                    fps: {type: GraphQLString},
                    restecg: {type: GraphQLString},
                    thalch: {type: GraphQLString},
                    exang: {type: GraphQLString},
                    oldpeak: {type: GraphQLString},
                    slope: {type: GraphQLString},
                    thal: {type: GraphQLString},
                    target: {type: GraphQLString}
                },
                resolve: async function (root, params, context) {
                    if (!context.user || context.user.isNurse == true) {
                        throw new Error('not Authorized')
                    }

                    params.recordDate = moment().format("DD-MM-YYYY");
                    params.user_id = context.user;
                    const dailyInfo = new VitalInformation(params);
                    const newDailyInfo = dailyInfo.save();
                    if (!newDailyInfo) {
                        throw new Error('Error');
                    }
                    return newDailyInfo
                }
            }
        };
    },
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
