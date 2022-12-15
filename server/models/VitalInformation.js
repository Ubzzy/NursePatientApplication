var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var vitalInformation = mongoose.Schema(
    {
        cp: {type: String},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        recordDate: {type: String, required: true},
        trestbps: {type: String},
        chol: {type: String},
        fps: {type: String},
        restecg: {type: String},
        thalch: {type: String},
        exang: {type: String},
        oldpeak: {type: String},
        slope: {type: String},
        thal: {type: String},
        target: {type: String},
    },
    {
        collection: "vitalinformation",
    }
);


module.exports = mongoose.model("vitalInformation", vitalInformation);
