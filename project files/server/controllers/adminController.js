const Doctor = require("../models/DoctorModel");
const User = require("../models/UserModel");

// Get All Doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).sort({ createdAt: -1 });

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

// Approve Doctor
const approveDoctorController = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    doctor.status = "approved";
    await doctor.save();

    await User.findByIdAndUpdate(doctor.userId, {
      isDoctor: true,
    });

    res.status(200).send({
      success: true,
      message: "Doctor Approved Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Unable to approve doctor",
    });
  }
};

// Reject Doctor
const rejectDoctorController = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    doctor.status = "rejected";
    await doctor.save();

    res.status(200).send({
      success: true,
      message: "Doctor Rejected",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Unable to reject doctor",
    });
  }
};

module.exports = {
  getAllDoctorsController,
  approveDoctorController,
  rejectDoctorController,
};