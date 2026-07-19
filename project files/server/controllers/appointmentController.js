const Appointment = require("../models/AppointmentModel");

// ================= BOOK APPOINTMENT =================

const bookAppointmentController = async (req, res) => {
  try {

    const appointment = new Appointment(req.body);

    await appointment.save();

    res.status(201).send({
      success: true,
      message: "Appointment Booked Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Unable to Book Appointment",
    });

  }
};

// ================= USER APPOINTMENTS =================

const getUserAppointmentsController = async (req, res) => {

  try {

    const appointments = await Appointment.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      appointments,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Unable to Fetch Appointments",
    });

  }

};

module.exports = {
  bookAppointmentController,
  getUserAppointmentsController,
};