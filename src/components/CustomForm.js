import React, { useState } from "react";
import "./CustomForm.css";

function CustomForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.role) newErrors.role = "Please select a role";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        role: "",
        message: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <h2 className="text-center mb-4">Contact Form</h2>

      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <div className="input-container">
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <div className="input-container">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <div className="input-container">
          <select
            className={`form-select ${errors.role ? "is-invalid" : ""}`}
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
          {errors.role && <div className="invalid-feedback">{errors.role}</div>}
        </div>
      </div>

      <div className="form-group message-group">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <div className="input-container">
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message here (optional)"
          ></textarea>
        </div>
      </div>

      <div className="submit-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CustomForm;
