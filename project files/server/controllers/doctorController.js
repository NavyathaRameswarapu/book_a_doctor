const Doctor = require("../models/DoctorModel");
const Appointment = require("../models/AppointmentModel");
const User = require("../models/UserModel");

// ================= Apply Doctor =================

const applyDoctorController = async (req, res) => {
  try {

    const doctor = new Doctor(req.body);

    await doctor.save();

    res.status(201).send({
      success: true,
      message: "Doctor Application Submitted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Applying Doctor",
    });

  }
};

// ================= All Approved Doctors =================

const getAllDoctorsController = async (req, res) => {
  try {

    const doctors = await Doctor.find({
      status: "approved",
    });

    res.status(200).send({
      success: true,
      doctors,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Unable to fetch doctors",
    });

  }
};

// ================= Doctor Appointments =================

const getDoctorAppointmentsController = async (req, res) => {

  try {

    const doctor = await Doctor.findOne({
      userId: req.params.userId,
    });

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    const appointments = await Appointment.find({
      doctorId: doctor._id,
    }).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      appointments,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Unable to fetch appointments",
    });

  }

};

// ================= Approve Appointment =================

const approveAppointmentController = async (req, res) => {

  try {

    const appointment = await Appointment.findById(req.params.id);

    appointment.status = "approved";

    await appointment.save();

    await User.findByIdAndUpdate(
      appointment.userId,
      {
        $push: {
          notification: {
            title: "Appointment Approved",
            message: `Your appointment with ${appointment.doctorName} has been approved.`,
          },
        },
      }
    );

    res.status(200).send({
      success: true,
      message: "Appointment Approved",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Unable to approve appointment",
    });

  }

};

// ================= Reject Appointment =================

const rejectAppointmentController = async (req, res) => {

  try {

    const appointment = await Appointment.findById(req.params.id);

    appointment.status = "rejected";

    await appointment.save();

    await User.findByIdAndUpdate(
      appointment.userId,
      {
        $push: {
          notification: {
            title: "Appointment Rejected",
            message: `Your appointment with ${appointment.doctorName} has been rejected.`,
          },
        },
      }
    );

    res.status(200).send({
      success: true,
      message: "Appointment Rejected",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Unable to reject appointment",
    });

  }

};

module.exports = {
  applyDoctorController,
  getAllDoctorsController,
  getDoctorAppointmentsController,
  approveAppointmentController,
  rejectAppointmentController,
};