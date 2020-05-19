const crypto = require("crypto");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      default: "User"
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    salt: {
      type: String,
      required: true,
    },
    key_fobs: Array,
    delete_date: Date,
  },
  { timestamps: true },
);

// Validate password
userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.password === hash;
};

// Hash the password
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

module.exports = mongoose.model("user", userSchema);
