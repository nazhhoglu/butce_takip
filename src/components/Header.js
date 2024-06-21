import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1890ff",
    padding: "20px",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
  },
};

const HeaderBar = () => (
  <Header style={styles.header}>
    <div style={styles.logo}>$pend$mart</div>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">Dashboard</Menu.Item>
      <Menu.Item key="2">Search</Menu.Item>
      <Menu.Item key="3">Profile</Menu.Item>
    </Menu>
  </Header>
);

export default HeaderBar;
