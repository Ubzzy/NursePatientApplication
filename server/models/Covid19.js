var mongoose = require("mongoose");

var TipSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        symptoms: { type: [String] },
        submittedOn: { type: String }
    },
    {
        collection: "covid19",
    }
);

module.exports = mongoose.model("covid19", TipSchema);
