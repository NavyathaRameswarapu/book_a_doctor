const express = require("express");

const router = express.Router();

const {
  applyDoctorController,
  getAllDoctorsController,
  getDoctorAppointmentsController,
  approveAppointmentController,
  rejectAppointmentController,
} = require("../controllers/doctorController");

router.post("/apply-doctor", applyDoctorController);

router.get("/all-doctors", getAllDoctorsController);

router.get(
  "/appointments/:userId",
  getDoctorAppointmentsController
);

router.put(
  "/approve/:id",
  approveAppointmentController
);

router.put(
  "/reject/:id",
  rejectAppointmentController
);

module.exports = router;