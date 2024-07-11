import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { message } from "antd";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    surname: "",

    email: "",
    password: "",
    country: "Russia",
    telephone: "",
    gender: "Woman",
    birthYear: "2000",
    birthMonth: "December",
    birthDay: "01",
    photo: null,
    photoURL: "",
  });

  useEffect(() => {
    fetch(
      "https://v1.nocodeapi.com/nazhhoglu/google_sheets/fipygIlArinvVuqs?tabId=Sayfa1",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer your_token_here", // Gerekli yetkilendirme bilgilerini buraya ekleyin
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const user = data.data[0]; // Datanın formatına göre düzenleyin
        setProfile({
          name: user.name || "",
          surname: user.surname || "",
          country: user.country || "Russia",
          email: user.email || "",
          password: user.password || "",
          telephone: user.telephone || "",

          gender: user.gender || "Woman",
          birthYear: user.birthYear || "2000",
          birthMonth: user.birthMonth || "December",
          birthDay: user.birthDay || "01",
          photoURL: user.photoURL || "",
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

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
    if (
      !profile.name ||
      !profile.surname ||
      !profile.email ||
      !profile.password
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    // Google Sheets'e kaydetmek için veri hazırlama
    const rowData = [
      profile.name,
      profile.surname,
      profile.email,
      profile.password,
      profile.country,
      profile.telephone,
      profile.gender,
      profile.birthYear,
      profile.birthMonth,
      profile.birthDay,
      profile.photoURL,
    ];

    fetch(
      "https://v1.nocodeapi.com/nazhhoglu/google_sheets/fipygIlArinvVuqs?tabId=Sayfa1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_token_here", // Gerekli yetkilendirme bilgilerini buraya ekleyin
        },
        body: JSON.stringify([rowData]), // Veri formatı API'ye göre düzenlenmeli
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Profil güncellendi:", data);
        message.success("Profil başarıyla güncellendi.");
        // Başarı mesajı veya gerekli işlemleri burada yapabilirsiniz
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <form className="profile-page-form" onSubmit={handleSubmit}>
      <div className="profile-input-pair">
        <div className="profile-floating-label">
          <label>Ad</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="İlk adınız"
          />
        </div>
        <div className="profile-floating-label">
          <label>Soyad</label>
          <input
            type="text"
            name="surname"
            value={profile.surname}
            onChange={handleChange}
            placeholder="Soyadınız"
          />
        </div>
      </div>

      <div className="profile-input-pair">
        <div className="profile-floating-label">
          <label>Ülke/Bölge</label>
          <select
            name="country"
            value={profile.country}
            onChange={handleChange}
          >
            <option value="Russia">Rusya</option>
            <option value="USA">ABD</option>
            <option value="Canada">Kanada</option>
            <option value="Turkey">Türkiye</option>
            <option value="Germany">Almanya</option>
            <option value="France">Fransa</option>
            <option value="Italy">İtalya</option>
            <option value="China">Çin</option>
            <option value="Japan">Japonya</option>
            <option value="Brazil">Brezilya</option>
            <option value="India">Hindistan</option>
            <option value="Australia">Avustralya</option>
          </select>
        </div>
        <div className="profile-floating-label">
          <label>Telefon</label>
          <input
            type="tel"
            name="telephone"
            value={profile.telephone}
            onChange={handleChange}
            placeholder="Telefon numaranız"
          />
        </div>
      </div>

      <div className="profile-input-pair">
        <div className="profile-floating-label">
          <label>E-posta</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="E-posta adresiniz"
            readOnly // E-posta alanını sadece okunabilir yapabilirsiniz
          />
        </div>
        <div className="profile-floating-label">
          <label>Şifre</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Şifreniz"
            readOnly
          />
        </div>
      </div>

      <div className="profile-form-group">
        <div className="profile-floating-label">
          <label>Cinsiyet</label>
          <div className="profile-gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Woman"
                checked={profile.gender === "Woman"}
                onChange={handleChange}
              />{" "}
              Kadın
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Man"
                checked={profile.gender === "Man"}
                onChange={handleChange}
              />{" "}
              Erkek
            </label>
          </div>
        </div>
      </div>

      <div className="profile-form-group">
        <div className="profile-floating-label">
          <label>Doğum Tarihi</label>
          <div className="profile-dob-options">
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
              <option value="January">Ocak</option>
              <option value="February">Şubat</option>
              <option value="March">Mart</option>
              <option value="April">Nisan</option>
              <option value="May">Mayıs</option>
              <option value="June">Haziran</option>
              <option value="July">Temmuz</option>
              <option value="August">Ağustos</option>
              <option value="September">Eylül</option>
              <option value="October">Ekim</option>
              <option value="November">Kasım</option>
              <option value="December">Aralık</option>
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
      </div>

      <div className="profile-form-group">
        <label>Fotoğraf</label>
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
              <div className="photo-placeholder">Fotoğraf Yükle</div>
            )}
          </label>
        </div>
      </div>

      <div className="profile-submit-button">
        <button type="submit">Kaydet</button>
      </div>
    </form>
  );
};

export default ProfilePage;
