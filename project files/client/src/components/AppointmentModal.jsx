import { useState } from "react";
import axios from "axios";
import "../styles/appointmentModal.css";

function AppointmentModal({ doctor, user, onClose }) {

  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const formData = {
        userId: user._id,
        doctorId: doctor._id,
        patientName: user.name,
        doctorName: doctor.fullName,
        specialization: doctor.specialization,
        appointmentDate,
        reason,
        fees: doctor.fees,
        status: "pending",
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/appointment/book",
        formData
      );

      if (data.success) {

        alert("Appointment Booked Successfully");

        onClose();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.log(err);
      alert("Unable to book appointment");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="appointment-overlay">

      <div className="appointment-modal">

        <div className="appointment-header">

          <h3>Book Appointment</h3>

          <button onClick={onClose}>✕</button>

        </div>

        <form onSubmit={submitHandler}>

          <div className="doctor-info">

            <p><strong>Doctor :</strong> {doctor.fullName}</p>

            <p><strong>Specialization :</strong> {doctor.specialization}</p>

            <p><strong>Consultation Fee :</strong> ₹{doctor.fees}</p>

          </div>

          <label>Appointment Date & Time</label>

          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />

          <label>Reason for Visit</label>

          <textarea
            rows="3"
            placeholder="Describe your problem..."
            value={reason}
            onChange={(e)=>setReason(e.target.value)}
            required
          />

          <label>Medical Report (Optional)</label>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e)=>setReport(e.target.files[0])}
          />

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Close
            </button>

            <button
              type="submit"
              className="book-btn"
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AppointmentModal;