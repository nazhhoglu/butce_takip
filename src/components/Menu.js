// src/components/Menu.js
import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Menu.css";

const { SubMenu } = Menu;

const SideMenu = () => (
  <Menu
    mode="inline"
    defaultSelectedKeys={["1"]}
    style={{
      height: "100%",
      borderRight: 0,
      width: "250px",
      padding: "10px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    }}
    className="custom-menu"
  >
    <Menu.Item
      key="1"
      icon={<DashboardOutlined />}
      className="custom-menu-item"
    >
      <Link to="/home">Anasayfa</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<BarChartOutlined />} className="custom-menu-item">
      <Link to="/statistics">İstatistik</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<CalendarOutlined />} className="custom-menu-item">
      <Link to="/calendar">Takvim</Link>
    </Menu.Item>
    <Menu.Item key="4" icon={<UserOutlined />} className="custom-menu-item">
      <Link to="/profile">Profil</Link>
    </Menu.Item>
    <Menu.Item key="7" icon={<LogoutOutlined />} className="custom-menu-item">
      <Link to="/">Çıkış Yap</Link>
    </Menu.Item>
  </Menu>
);

export default SideMenu;
