import React from "react";
import { Layout } from "antd";

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
    fontSize: "30px",
    fontWeight: "bold",
    color: "rgb(69, 124, 146)",
  },
};

const HeaderBar = () => (
  <Header style={styles.header}>
    <div style={styles.logo}>$pend$mart</div>
  </Header>
);

export default HeaderBar;
