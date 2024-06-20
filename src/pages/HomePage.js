import React from "react";
import { Layout, Menu, Breadcrumb, Card, Avatar } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  UserOutlined,
  DollarOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./HomePage.css";
import { Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const HomePage = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header className="header">
      <div className="logo">$pend$mart</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Dashboard</Menu.Item>
        <Menu.Item key="2">Search</Menu.Item>
        <Menu.Item key="3">Profile</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<BarChartOutlined />}>
            Statistics
          </Menu.Item>
          <Menu.Item key="3" icon={<CreditCardOutlined />}>
            Cards
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="5" icon={<DollarOutlined />}>
            Payments
          </Menu.Item>
          <Menu.Item key="6" icon={<QuestionCircleOutlined />}>
            Support
          </Menu.Item>
          <Menu.Item key="7" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="8" icon={<LogoutOutlined />}>
            Log out
            <Link to="/"></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <div className="site-card-wrapper">
            <Card title="Monthly Details" className="dashboard-card">
              {/* Chart component will go here */}
            </Card>
            <Card title="Your Card" className="dashboard-card">
              {/* Card details and recent payments will go here */}
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default HomePage;
