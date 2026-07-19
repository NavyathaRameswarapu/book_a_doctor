const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    appointmentDate: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },

    fees: {
      type: Number,
      required: true,
    },

    report: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.appointments ||
  mongoose.model("appointments", appointmentSchema);