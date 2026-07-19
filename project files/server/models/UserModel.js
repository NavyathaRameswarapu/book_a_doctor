const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // NEW
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isDoctor: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    notification: {
      type: Array,
      default: [],
    },

    seenNotification: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent OverwriteModelError
module.exports =
  mongoose.models.users ||
  mongoose.model("users", userSchema);