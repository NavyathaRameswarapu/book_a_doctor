const express = require("express");
const router = express.Router();

const {
  getAllDoctorsController,
  approveDoctorController,
  rejectDoctorController,
} = require("../controllers/adminController");

router.get("/doctors", getAllDoctorsController);

router.put("/approve-doctor/:id", approveDoctorController);

router.put("/reject-doctor/:id", rejectDoctorController);

module.exports = router;