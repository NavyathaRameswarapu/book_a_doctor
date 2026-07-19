import { useState } from "react";
import doctorImage from "../assets/doctor.png";
import AppointmentModal from "./AppointmentModal";

function DoctorCard({ doctor }) {
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="doctor-card">

        <img src={doctorImage} alt="doctor" />

        <h3>{doctor.fullName}</h3>

        <p>
          <strong>Specialization:</strong> {doctor.specialization}
        </p>

        <p>
          <strong>Experience:</strong> {doctor.experience}
        </p>

        <p>
          <strong>Fee:</strong> ₹{doctor.fees}
        </p>

        <button
          className="book-btn"
          onClick={() => setShowModal(true)}
        >
          Book Appointment
        </button>

      </div>

      {showModal && (
        <AppointmentModal
          doctor={doctor}
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default DoctorCard;