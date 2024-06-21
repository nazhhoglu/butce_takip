// src/components/Header.js
import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const HeaderBar = () => (
  <Header className="header">
    <div className="logo">$pend$mart</div>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">Dashboard</Menu.Item>
      <Menu.Item key="2">Search</Menu.Item>
      <Menu.Item key="3">Profile</Menu.Item>
    </Menu>
  </Header>
);

export default HeaderBar;
