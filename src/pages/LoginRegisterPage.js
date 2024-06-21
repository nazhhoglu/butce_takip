import React, { useState } from "react";
import { Tabs, Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LoginRegisterPage.css";
import SignInButtons from "../components/SignInButtons";

const { TabPane } = Tabs;

const LoginRegisterPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const checkDuplicateEmail = async (email) => {
    try {
      const response = await axios.get(
        "https://v1.nocodeapi.com/nazhhoglu/google_sheets/fipygIlArinvVuqs?tabId=Sayfa1"
      );
      const users = response.data.data;

      // E-posta adreslerini kontrol et
      const duplicateEmail = users.some(
        (user) => user.email && user.email.toLowerCase() === email.toLowerCase()
      );

      return duplicateEmail;
    } catch (error) {
      console.error("E-posta kontrol hatası:", error);
      throw new Error("E-posta kontrolünde bir hata oluştu.");
    }
  };

  const handleRegisterFinish = async (values) => {
    try {
      const isDuplicateEmail = await checkDuplicateEmail(values.email);

      if (isDuplicateEmail) {
        message.error("Bu e-posta adresi zaten kayıtlı.");
        return; // Kayıt işleminden çık
      }

      // E-posta adresi tekrar yok, kayıt işlemini gerçekleştir
      const response = await fetch(
        "https://v1.nocodeapi.com/nazhhoglu/google_sheets/fipygIlArinvVuqs?tabId=Sayfa1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            [values.name, values.surname, values.email, values.password],
          ]),
        }
      );
      await response.json();
      message.success("Kayıt başarılı!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      message.error("Kayıt başarısız. Lütfen tekrar deneyin.");
    }
  };

  const handleLoginFinish = async (values) => {
    const endpointUrl =
      "https://v1.nocodeapi.com/nazhhoglu/google_sheets/fipygIlArinvVuqs?tabId=Sayfa1";

    try {
      const response = await axios.get(endpointUrl);
      const users = response.data.data;

      console.log("Gelen kullanıcılar:", users);

      // Email ve şifrenin eşleşip eşleşmediğini kontrol et
      const existingUser = users.find(
        (user) =>
          user.email &&
          user.password &&
          user.email.trim().toLowerCase() ===
            values.email.trim().toLowerCase() &&
          user.password.trim() === values.password.trim()
      );

      console.log("Eşleşen kullanıcı:", existingUser);

      if (existingUser) {
        message.success("Giriş başarılı!");
        navigate("/home");
      } else {
        message.error("Email veya şifre yanlış.");
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      message.error("Giriş başarısız. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="login-register-container">
      <Link to="/home">Anasayfa</Link>
      <div className="login-form-container">
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={onTabChange}>
          <TabPane tab="Giriş" key="1">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleLoginFinish}
            >
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

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Beni hatırla</Checkbox>
              </Form.Item>

              <p>
                <Link to="/resetpassword" className="forgot-password-link">
                  Şifrenizi mi unuttunuz?
                </Link>
              </p>

              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Giriş
                </Button>
              </Form.Item>
            </Form>
            <SignInButtons />
          </TabPane>
          <TabPane tab="Kayıt" key="2">
            <Form
              name="register"
              initialValues={{ remember: true }}
              onFinish={handleRegisterFinish}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Lütfen isminizi girin!" }]}
              >
                <Input placeholder="İsim" />
              </Form.Item>

              <Form.Item
                name="surname"
                rules={[
                  { required: true, message: "Lütfen soyisminizi girin!" },
                ]}
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
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
