var mongoose = require("mongoose");

var TipSchema = mongoose.Schema(
    {
        message: { type: String, required: true },
        createdBy: { type: String, required: true }
    },
    {
        collection: "tips",
    }
);

module.exports = mongoose.model("tips", TipSchema);
