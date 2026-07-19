const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    fullName: {
      type: String,
      required: true,
    },

    phone: String,

    email: String,

    specialization: String,

    experience: String,

    fees: Number,

    address: String,

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Export Model
module.exports =
  mongoose.models.doctors ||
  mongoose.model("doctors", doctorSchema);