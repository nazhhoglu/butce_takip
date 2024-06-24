import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(224,233,238,255)",
    padding: "20px",
  },
  logo: {
    fontSize: "35px",
    fontWeight: "bold",
    color: "rgb(69, 124, 146)",
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
