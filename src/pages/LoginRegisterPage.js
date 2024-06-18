import React, { useState } from "react";
import { Tabs, Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginRegisterPage.css";

const { TabPane } = Tabs;

const LoginRegisterPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const onRegisterFinish = async (values) => {
    const endpointUrl =
      "https://v1.nocodeapi.com/nazhhoglu/google_sheets/BgMLnNnsWvDbVuLw";
    try {
      const response = await axios.post(endpointUrl, {
        values: [[values.name, values.surname, values.email, values.password]],
      });

      if (response.status === 200) {
        message.success("Registration successful!");
      } else {
        message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error(`An error occurred during registration: ${error.message}`);
    }
  };

  const onLoginFinish = async (values) => {
    const endpointUrl =
      "https://v1.nocodeapi.com/nazhhoglu/google_sheets/BgMLnNnsWvDbVuLw";
    try {
      const response = await axios.get(endpointUrl);

      if (response.status === 200) {
        const users = response.data.data;
        const user = users.find((user) => user[2] === values.email);

        if (user) {
          if (user[3] === values.password) {
            message.success("Login successful!");
            navigate("/home");
          } else {
            message.error("Incorrect password.");
          }
        } else {
          message.error("Email not registered.");
        }
      } else {
        message.error("Failed to fetch users. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(`An error occurred during login: ${error.message}`);
    }
  };

  return (
    <div className="login-register-container">
      {" "}
      {/* Yeni eklenen class */}
      <div className="login-form-container">
        {" "}
        {/* Yeni eklenen class */}
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={onTabChange}>
          <TabPane tab="Login" key="1">
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
                    message: "Please input your Email!",
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Register" key="2">
            <Form
              name="register"
              initialValues={{ remember: true }}
              onFinish={onRegisterFinish}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                name="surname"
                rules={[
                  { required: true, message: "Please input your Surname!" },
                ]}
              >
                <Input placeholder="Surname" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Register
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
