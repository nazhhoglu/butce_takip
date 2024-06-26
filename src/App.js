import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, message } from "antd";
import axios from "axios";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import HomePage from "./pages/HomePage";
import StatisticsPage from "./pages/StatisticsPage";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import HeaderBar from "./components/Header";
import SideMenu from "./components/Menu";
import ResetPasswordPage from "./pages/ResetPasswordPage";

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
  const [email, setEmail] = useState("");

  const handleLoginFinish = async (values, navigate) => {
    const endpointUrl =
      "https://v1.nocodeapi.com/derinhho/google_sheets/eRbLYpdBAOJnqPVS?tabId=Sayfa1";

    try {
      const response = await axios.get(endpointUrl);
      const users = response.data.data;

      console.log("Gelen kullanıcılar:", users);

      const existingUser = users.find(
        (user) =>
          user.email &&
          user.password &&
          user.email.trim().toLowerCase() ===
            values.email.trim().toLowerCase() &&
          user.password.trim() === values.password.trim()
      );

      console.log("Eşleşen kullanıcı:", existingUser);

      if (existingUser) {
        message.success("Giriş başarılı!");
        navigate("/home");
        setEmail(values.email);
      } else {
        message.error("Email veya şifre yanlış.");
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      message.error("Giriş başarısız. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginRegisterPage onLoginFinish={handleLoginFinish} />}
        />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route
          path="/home"
          element={
            <AppLayout>
              <HomePage email={email} />
            </AppLayout>
          }
        />
        <Route
          path="/statistics"
          element={
            <AppLayout>
              <StatisticsPage email={email} />
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
          path="/calendar"
          element={
            <AppLayout>
              <CalendarPage email={email} />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
