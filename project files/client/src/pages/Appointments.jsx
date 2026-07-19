import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/appointments.css";

function Appointments() {

  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const loadAppointments = async () => {

    try {

      const { data } = await axios.get(
        `http://localhost:8000/api/appointment/user/${user._id}`
      );

      if (data.success) {

        setAppointments(data.appointments);

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadAppointments();

  }, []);

  return (

    <Layout>

      <div className="appointments-page">

        <h2>My Appointments</h2>

        <table className="appointment-table">

          <thead>

            <tr>

              <th>Doctor</th>

              <th>Specialization</th>

              <th>Date</th>

              <th>Time</th>

              <th>Fees</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {appointments.map((appointment) => (

              <tr key={appointment._id}>

                <td>{appointment.doctorName}</td>

                <td>{appointment.specialization}</td>

                <td>{appointment.appointmentDate}</td>

                <td>{appointment.appointmentTime}</td>

                <td>₹{appointment.fees}</td>

                <td>

                  <span
                    className={
                      "status " +
                      appointment.status.toLowerCase()
                    }
                  >
                    {appointment.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default Appointments;