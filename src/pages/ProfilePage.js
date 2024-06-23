import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    country: "Russia",
    telephone: "",
    email: "",
    password: "",
    gender: "Woman",
    birthYear: "2000",
    birthMonth: "December",
    birthDay: "01",
    photo: null,
    photoURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: file, photoURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log(profile);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Country or Region</label>
        <select name="country" value={profile.country} onChange={handleChange}>
          <option value="Russia">Russia</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          {/* Add more countries as needed */}
        </select>
      </div>
      <div className="form-group">
        <label>Telephone</label>
        <input
          type="tel"
          name="telephone"
          value={profile.telephone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <div className="gender-options">
          <input
            type="radio"
            name="gender"
            value="Woman"
            checked={profile.gender === "Woman"}
            onChange={handleChange}
          />{" "}
          Woman
          <input
            type="radio"
            name="gender"
            value="Man"
            checked={profile.gender === "Man"}
            onChange={handleChange}
          />{" "}
          Man
        </div>
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <div className="dob-options">
          <input
            type="number"
            name="birthYear"
            value={profile.birthYear}
            onChange={handleChange}
            min="1900"
            max="2024"
          />
          <select
            name="birthMonth"
            value={profile.birthMonth}
            onChange={handleChange}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <input
            type="number"
            name="birthDay"
            value={profile.birthDay}
            onChange={handleChange}
            min="1"
            max="31"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Photo</label>
        <div className="photo-upload">
          <input
            type="file"
            name="photo"
            id="photoUpload"
            onChange={handlePhotoUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="photoUpload" className="photo-upload-label">
            {profile.photoURL ? (
              <img
                src={profile.photoURL}
                alt="Profile"
                className="photo-preview"
              />
            ) : (
              <div className="photo-placeholder">Upload Photo</div>
            )}
          </label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfilePage;
