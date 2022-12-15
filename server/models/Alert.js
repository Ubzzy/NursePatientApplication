var mongoose = require("mongoose");

var AlertSchema = mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        userName: { type: String, required: true },
        status: { type: String, required: true },
        attendedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        alertedOn: { type: String, required: true },
        resolvedOn: { type: String  }
    },
    {
        collection: "alerts",
    }
);

module.exports = mongoose.model("alerts", AlertSchema);
