import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import Logout from "./Logout/Logout";

const { Header, Content, Footer, Sider } = Layout;

const LayoutTheme = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <PieChartOutlined />, path: "dashboard" },
    { key: "employees", label: "Employees", icon: <DesktopOutlined />, path: "employees" },
    { key: "departments", label: "Departments", icon: <TeamOutlined />, path: "departments" },
    { key: "leaves", label: "Leaves", icon: <FileOutlined />, path: "leaves" },
    { key: "salary", label: "Salary", icon: <UserOutlined />, path: "salary" },
    { key: "settings", label: "Settings", icon: <FileOutlined />, path: "setting" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" style={{ height: "32px", margin: "16px", background: "rgba(255, 255, 255, 0.3)" }} />
        <Menu theme="dark" defaultSelectedKeys={["dashboard"]} mode="inline">
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>Welcome to {role.name} Dashboard</div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#1890ff",
                cursor: "pointer",
              }}
            >
              <UserOutlined style={{ fontSize: "16px" }} /> Profile
            </button>
            <Logout />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutTheme;
