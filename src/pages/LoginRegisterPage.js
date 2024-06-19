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

  const onRegisterFinish = async (values) => {
    const endpointUrl =
      "https://v1.nocodeapi.com/nazhhoglu/google_sheets/fipygIlArinvVuqs?tabId=Sayfa1"; // NoCodeAPI uç noktası
    try {
      const response = await axios.post(endpointUrl, {
        command: "appendRow",
        sheet: "User", // Sayfa adı
        range: "A:D", // Verilerin yazılacağı aralık
        values: [[values.name, values.surname, values.email, values.password]],
      });

      if (response.status === 200 && response.data && response.data.success) {
        message.success("Kayıt başarılı!");
      } else {
        console.error("Kayıt yanıt hatası:", response);
        message.error("Kayıt başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error(
        "Kayıt hatası:",
        error.response ? error.response.data : error.message
      );
      message.error(
        `Kayıt sırasında bir hata oluştu: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const onLoginFinish = async (values) => {
    const endpointUrl =
      "https://v1.nocodeapi.com/nazhhoglu/google_sheets/fipygIlArinvVuqs?tabId=Sayfa1"; // NoCodeAPI uç noktası
    try {
      const response = await axios.get(endpointUrl);

      if (response.status === 200) {
        const users = response.data.data;
        const user = users.find((user) => user[2] === values.email);

        if (user) {
          if (user[3] === values.password) {
            message.success("Giriş başarılı!");
            navigate("/home");
          } else {
            message.error("Yanlış şifre.");
          }
        } else {
          message.error("Email kayıtlı değil.");
        }
      } else {
        message.error("Kullanıcılar alınamadı. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      message.error(`Giriş sırasında bir hata oluştu: ${error.message}`);
    }
  };

  return (
    <div className="login-register-container">
      <div className="login-form-container">
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={onTabChange}>
          <TabPane tab="Giriş" key="1">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onLoginFinish}
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
                <Link to="/reset-password">Şifrenizi mi unuttunuz?</Link>
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
              onFinish={onRegisterFinish}
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
