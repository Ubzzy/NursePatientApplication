var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

    const bcrypt = require("bcrypt");

var UserSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: {
            type: String,
            validate: [(password) => password && password.length > 6, "Password should be longer"],
        },
        isNurse: { type: Boolean },
    },
    {
        collection: "users",
    }
);

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

module.exports = mongoose.model("users", UserSchema);
