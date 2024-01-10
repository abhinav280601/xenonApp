import React, { useState } from "react";
import { api } from "../../assets/data";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleSignup = async () => {
    try {
      console.log(formData);
      const response = await axios.post(`${api}register`, formData);
      setres(response.data.msg);
      console.log(response); // Assuming you want to log the response data
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <div className="login-top">
      <div className="signup-inner-top">
        <div className="login-head">SIGNUP</div>
        <div className="login-input-detail">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <button onClick={handleSignup}>Signup</button>
        </div>
        <div className="login-link-signup">
          Already a User ?{" "}
          <Link to={"/login"} style={{ color: "blue" }}>
            Login
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Signup;
