import React, { useState } from "react";
import { Tabs, Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LoginRegisterPage.css";
import SignInButtons from "../components/SignInButtons";

const { TabPane } = Tabs;

const LoginRegisterPage = ({ onLoginFinish }) => {
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
        return;
      }

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
    onLoginFinish(values, navigate);
  };

  return (
    <div className="login-register-container">
      <Link to="/home" className="custom-link">
        Anasayfa
      </Link>
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
                <div className="floating-label">
                  <Input placeholder=" " />
                  <label>Email</label>
                </div>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
              >
                <div className="floating-label">
                  <Input type="password" placeholder=" " />
                  <label>Şifre</label>
                </div>
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="custom-checkbox">Beni hatırla</Checkbox>
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
                <div className="floating-label">
                  <Input placeholder=" " />
                  <label>İsim</label>
                </div>
              </Form.Item>

              <Form.Item
                name="surname"
                rules={[
                  { required: true, message: "Lütfen soyisminizi girin!" },
                ]}
              >
                <div className="floating-label">
                  <Input placeholder=" " />
                  <label>Soyisim</label>
                </div>
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
                <div className="floating-label">
                  <Input placeholder=" " />
                  <label>Email</label>
                </div>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
              >
                <div className="floating-label">
                  <Input type="password" placeholder=" " />
                  <label>Şifre</label>
                </div>
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
