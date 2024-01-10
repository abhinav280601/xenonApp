import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  // State to manage form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    carModelName: "",
    expectedPrice: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  // Handle form submission
  const submitForm = async () => {
    try {
      // Make a POST request to your backend API
      // await axios.post("/api/formSubmit", formData);

      // Reset form after successful submission
      await axios
        .post("http://localhost:5000/formSubmit", formData)
        .then((response) => {
          console.log(response);
          alert("Form submitted successfully!");
        });

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        carModelName: "",
        expectedPrice: "",
      });

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-top">
      <div className="form-inner-top">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Car Model Name:</label>
          <input
            type="text"
            name="carModelName"
            placeholder="Enter car model name"
            value={formData.carModelName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Expected Price:</label>
          <input
            type="text"
            name="expectedPrice"
            placeholder="Enter expected price"
            value={formData.expectedPrice}
            onChange={handleChange}
            required
          />
        </div>
        <button onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
};

export default ContactForm;
