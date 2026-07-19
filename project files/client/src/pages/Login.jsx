import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import loginImage from "../assets/login.png";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );

     if (data.success) {

  console.log("Login user:", data.user);

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  alert("Login Successful");

  if (data.user.isAdmin) {
    navigate("/admin");
  }
  else if (data.user.isDoctor) {
    navigate("/doctor");
  }
  else {
    navigate("/dashboard");
  }
}
       else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-left">

          <img src={loginImage} alt="login"/>

        </div>

        <div className="auth-right">

          <h1>Welcome Back</h1>

          <p>Login to continue booking doctors.</p>

          <form onSubmit={submitHandler}>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <button>
              Login
            </button>

          </form>

          <p className="bottom-text">
            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;