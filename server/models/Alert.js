var mongoose = require("mongoose");

var AlertSchema = mongoose.Schema(
    {
        patientId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        status: { type: String, required: true },
        attendedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        alertedOn: { type: String, required: true }
    },
    {
        collection: "alerts",
    }
);

module.exports = mongoose.model("alerts", AlertSchema);
