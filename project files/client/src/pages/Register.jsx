import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import registerImage from "../assets/register.png";
import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [role, setRole] = useState("user");
  const submitHandler=async(e)=>{

    e.preventDefault();

    try{

      const {data}=await axios.post(
        "http://localhost:8000/api/user/register",
        {
  name,
  email,
  phone,
  password,
  role
}
      );

      if(data.success){

        alert(data.message);

        navigate("/login");

      }
      else{

        alert(data.message);

      }

    }
    catch(error){

      console.log(error);

      alert("Something went wrong");

    }

  }

  return(

<div className="auth-page">

<div className="auth-container">

<div className="auth-left">

<img
src={registerImage}
alt=""
/>

</div>

<div className="auth-right">

<h1>Create Account</h1>

<p>

Create your account to continue.

</p>

<form onSubmit={submitHandler}>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="text"
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>
<div className="role-select">

  <label>

    <input
      type="radio"
      value="admin"
      checked={role === "admin"}
      onChange={(e)=>setRole(e.target.value)}
    />

    Admin

  </label>

  <label>

    <input
      type="radio"
      value="user"
      checked={role === "user"}
      onChange={(e)=>setRole(e.target.value)}
    />

    User

  </label>

</div>
<button>

Register

</button>

</form>

<p className="bottom-text">

Already have an account?

<Link to="/login">

 Login

</Link>

</p>

</div>

</div>

</div>

  )

}

export default Register;