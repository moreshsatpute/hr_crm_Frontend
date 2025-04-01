import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const LayoutTheme = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation(); // Get the current location
  const currentPath = location.pathname; // Extract the current path
  console.log("Current Path:", currentPath); // Log the current path
  const menuItems = [
    {
      key: "/admin-dashboard/dashboard", // Match the path
      label: "Dashboard",
      icon: <PieChartOutlined />,
      path: "/admin-dashboard/dashboard",
    },
    {
      key: "/admin-dashboard/employees", // Match the path
      label: "Employees",
      icon: <DesktopOutlined />,
      path: "/admin-dashboard/employees",
    },
    {
      key: "/admin-dashboard/departments", // Match the path
      label: "Departments",
      icon: <TeamOutlined />,
      path: "/admin-dashboard/departments",
    },
    {
      key: "/admin-dashboard/leaves", // Match the path
      label: "Leaves",
      icon: <FileOutlined />,
      path: "/admin-dashboard/leaves",
    },
    {
      key: "/admin-dashboard/salary", // Match the path
      label: "Salary",
      icon: <UserOutlined />,
      path: "/admin-dashboard/salary",
    },
    {
      key: "/admin-dashboard/setting", // Match the path
      label: "Settings",
      icon: <FileOutlined />,
      path: "/admin-dashboard/setting",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPath]} // Dynamically set the selected menu item
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          Welcome to {role.name} Dashboard
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
          <Outlet /> {/* 🔥 This is the real fix */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutTheme;