import React, { useState } from "react";
import { Tabs, Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";

const { TabPane } = Tabs;

const LoginRegisterPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const onRegisterFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://v1.nocodeapi.com/nazhhoglu/google_sheets/aPbHKZGeCyToqPsU",
        {
          values: [
            [values.name, values.surname, values.email, values.password],
          ],
        }
      );

      if (response.status === 200) {
        message.success("Registration successful!");
      } else {
        message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("An error occurred during registration. Please try again.");
    }
  };

  const onLoginFinish = async (values) => {
    // Giriş işlemini gerçekleştirecek kod burada olacak
  };

  return (
    <div
      style={{
        width: 300,
        margin: "auto",
        padding: 20,
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
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
  );
};

export default LoginRegisterPage;
