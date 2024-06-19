import React, { useState } from "react";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada şifre sıfırlama işlemini başlatacak kodu ekleyeceksiniz
    console.log("Şifre sıfırlama isteği gönderildi:", email);
  };

  return (
    <div>
      <h1>Şifre Sıfırlama</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Şifre Sıfırla</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
