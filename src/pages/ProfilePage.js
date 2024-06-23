import React from "react";
import { Form, Input, Button } from "antd";
import "./LoginRegisterPage.css"; // CSS dosyasını buraya ekliyoruz

const ProfilePage = () => {
  return (
    <div key="profile-form-container" className="profile-form-container">
      {" "}
      {/* CSS sınıfını buraya ekliyoruz */}
      <Form>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Lütfen isminizi girin!" }]}
        >
          <Input placeholder="İsim" />
        </Form.Item>

        <Form.Item
          name="surname"
          rules={[{ required: true, message: "Lütfen soyisminizi girin!" }]}
        >
          <Input placeholder="Soyisim" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Lütfen Email'inizi girin!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
        >
          <Input type="password" placeholder="Şifre" />
        </Form.Item>

        <Form.Item>
          <Button
            className="custom-button"
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
