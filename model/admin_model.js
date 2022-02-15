const mongoose = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

const schema = new mongoose.Schema(
  {
    email: {
      desc: "The users's email.",
      type: String,
      required: true,
      index: { unique: true },
    },
    name: {
      desc: "The users's name.",
      type: String,
    },
    password: {
      desc: "The users's password.",
      required: true,
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    strict: true,
    versionKey: false,
    name: "Admin",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

//this method will hash the password before saving the user model
schema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

schema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  return obj;
};

//this method generates an auth token for the user
schema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    "secret"
  );

  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

//this method search for a user by email and password.
schema.statics.findByCredentials = async function (email, password) {
  const user = await this.model("Admin").findOne({ email });

  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error({  error: "Invalid login details" });
  }

  return user;
};

schema.plugin(mongoose_fuzzy_searching, {
  fields: ["name", "email"],
});

module.exports = mongoose.model("Admin", schema);
