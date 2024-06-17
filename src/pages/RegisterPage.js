// src/components/LoginRegister.js
import React, { useState } from "react";
import { Tabs, Form, Input, Button, Checkbox } from "antd";

const { TabPane } = Tabs;

const LoginRegister = () => {
  // Sekmeler arasında geçişi yönetmek için state (durum) tanımlanıyor
  const [activeTab, setActiveTab] = useState("1");

  // Sekme değişikliklerini yönetmek için fonksiyon tanımlanıyor
  const onTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div
      style={{
        width: 300, // Genişlik
        margin: "auto", // Ortalamak için margin
        padding: 20, // İç boşluk
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // Gölgeleme
        backgroundColor: "white", // Arka plan rengi
        borderRadius: 10, // Kenar yuvarlaklığı
      }}
    >
      {/* Sekmeler (Login ve Register) */}
      <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={onTabChange}>
        <TabPane tab="Login" key="1">
          {/* Login Formu */}
          <Form name="login" initialValues={{ remember: true }}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Username" />
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
          {/* Register Formu */}
          <Form name="register" initialValues={{ remember: true }}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Username" />
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

export default LoginRegister;
