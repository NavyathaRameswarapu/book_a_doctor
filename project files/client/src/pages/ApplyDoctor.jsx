import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/applyDoctor.css";

function ApplyDoctor() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    specialization: "",
    experience: "",
    fees: "",
    address: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || !currentUser._id) {
      alert("Please login again.");
      return;
    }

    try {
      const payload = {
        ...form,
        userId: currentUser._id,
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/doctor/apply-doctor",
        payload
      );

      if (data.success) {
        alert(data.message);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Application Failed");
    }
  };

  return (
    <Layout>
      <div className="apply-container">

        <h2>Apply as Doctor</h2>

        <form onSubmit={submit} className="doctor-form">

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={change}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={change}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
            required
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={change}
            required
          />

          <input
            name="experience"
            placeholder="Experience"
            value={form.experience}
            onChange={change}
            required
          />

          <input
            type="number"
            name="fees"
            placeholder="Consultation Fee"
            value={form.fees}
            onChange={change}
            required
          />

          <textarea
            name="address"
            placeholder="Clinic Address"
            rows="4"
            value={form.address}
            onChange={change}
            required
          />

          <button type="submit">
            Submit Application
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default ApplyDoctor;