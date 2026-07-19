const express = require("express");

const router = express.Router();

const {
  bookAppointmentController,
  getUserAppointmentsController,
} = require("../controllers/appointmentController");

// Book Appointment
router.post("/book", bookAppointmentController);

// User Appointments
router.get("/user/:userId", getUserAppointmentsController);

module.exports = router;