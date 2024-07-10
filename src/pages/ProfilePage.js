import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Kullanıcı bilgilerini almak için bir API çağrısı
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
        // API'den gelen kullanıcı bilgilerini state'e yerleştirin
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          telephone: data.telephone,
          email: data.email,
          password: data.password,
          gender: data.gender,
          birthYear: data.birthYear,
          birthMonth: data.birthMonth,
          birthDay: data.birthDay,
          photoURL: data.photoURL,
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
    // Form doğrulama
    if (
      !profile.firstName ||
      !profile.lastName ||
      !profile.email ||
      !profile.password
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    // Profil güncelleme işlemi için bir PUT isteği yapın
    fetch(
      "https://v1.nocodeapi.com/nazhhoglu/google_sheets/fipygIlArinvVuqs?tabId=Sayfa1",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_token_here", // Gerekli yetkilendirme bilgilerini buraya ekleyin
        },
        body: JSON.stringify(profile),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Profil güncellendi:", data);
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
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            placeholder="İlk adınız"
          />
        </div>
        <div className="profile-floating-label">
          <label>Soyad</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
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
