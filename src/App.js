import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import HomePage from "./pages/HomePage";
import StatisticsPage from "./pages/StatisticsPage";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import HeaderBar from "./components/Header";
import SideMenu from "./components/Menu";

const { Content, Sider } = Layout;

const AppLayout = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <HeaderBar />
    <Layout>
      <Sider width={200} className="site-layout-background">
        <SideMenu />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegisterPage />} />
        <Route
          path="/home"
          element={
            <AppLayout>
              <HomePage />
            </AppLayout>
          }
        />
        <Route
          path="/statistics"
          element={
            <AppLayout>
              <StatisticsPage />
            </AppLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          }
        />
        <Route
          path="/calender"
          element={
            <AppLayout>
              <CalendarPage />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
