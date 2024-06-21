// src/components/Menu.js
import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const SideMenu = () => (
  <Menu
    mode="inline"
    defaultSelectedKeys={["1"]}
    style={{ height: "100%", borderRight: 0 }}
  >
    <Menu.Item key="1" icon={<DashboardOutlined />}>
      <Link to="/home">Anasayfa</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<BarChartOutlined />}>
      <Link to="/statistics">İstatistik</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<CalendarOutlined />}>
      <Link to="/calendar">Takvim</Link>
    </Menu.Item>
    <Menu.Item key="4" icon={<UserOutlined />}>
      <Link to="/profile">Profil</Link>
    </Menu.Item>
    <Menu.Item key="5" icon={<DollarOutlined />}>
      <Link to="/payments">Ödemeler</Link>
    </Menu.Item>
    <Menu.Item key="6" icon={<SettingOutlined />}>
      <Link to="/settings">Ayarlar</Link>
    </Menu.Item>
    <Menu.Item key="7" icon={<LogoutOutlined />}>
      <Link to="/">Çıkış Yap</Link>
    </Menu.Item>
  </Menu>
);

export default SideMenu;
