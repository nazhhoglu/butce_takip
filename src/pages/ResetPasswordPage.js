import React, { useState } from "react";
import "./ResetPasswordPage.css";
import { message } from "antd";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada şifre sıfırlama işlemini başlatacak kodu ekleyeceksiniz
    console.log("Şifre sıfırlama isteği gönderildi:", email);
    message.info("Şifre sıfırlama isteği gönderildi: " + email);
  };

  const handleCancel = () => {
    // Kapatma işlevi burada eklenecek, giriş sayfasına yönlendirme yapılacak
    console.log("Şifre sıfırlama işlemi iptal edildi.");
    // Yönlendirme yapmak için aşağıdaki kodu kullanabilirsiniz
    window.location.href = "/";
  };

  return (
    <div className="reset-password-container">
      <div className="close-button" onClick={handleCancel}>
        X
      </div>
      <h1 className="reset-password-title">$pend$mart Hesabını Bul</h1>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="reset-password-form-item">
          <label>Şifeni değiştirmek için lütfen e-posta adresini gir.</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="reset-password-button">
          Şifre Sıfırla
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
