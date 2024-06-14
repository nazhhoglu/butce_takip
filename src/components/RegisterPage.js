import React from "react";
import { Input, Button } from "antd"; // Ant Design kütüphanesi kullanıldığı varsayılarak import edildi

const RegisterPage = () => {
  return (
    <div>
      <label>Adınız:</label>
      <Input placeholder="Ad" type="text" style={{ width: 200, height: 30 }} />
      <br />
      <label>Soyadınız:</label>
      <Input
        placeholder="Soyad"
        type="text"
        style={{ width: 200, height: 30 }}
      />
      <br />
      <label>E-mail Adresiniz:</label>
      <Input
        placeholder="E-mail"
        type="email"
        style={{ width: 200, height: 30 }}
      />
      <br />
      <label>Şifreniz:</label>
      <Input
        placeholder="Şifre"
        type="password"
        style={{ width: 200, height: 30 }}
      />
      <br />
      <Button type="primary">Kayıt Olun</Button>
    </div>
  );
};

export default RegisterPage;
