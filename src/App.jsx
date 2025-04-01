import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LogInPage from "./components/LogInPage";
import Dashboard from "./components/Admin/Dashboard";
import Employees from "./components/Admin/Employees";
import Departments from "./components/Admin/Departments";
import Leaves from "./components/Admin/Leaves";
import Salary from "./components/Admin/Salary";
import Setting from "./components/Admin/Setting";
import { AuthProvider } from "./context/authContext";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import LayoutTheme from "./components/LayoutTheme";
import PrivateRoutes from "./utils/PrivateRoutes";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogInPage />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBasedRoutes requiredRole={["admin"]}>
                  <LayoutTheme role={{ name: "Admin" }} /> // ✅ Correct
                  placement
                </RoleBasedRoutes>
              </PrivateRoutes>
            }
          >
            {/* Nested routes for admin dashboard */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="departments" element={<Departments />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="salary" element={<Salary />} />
            <Route path="setting" element={<Setting />} />
            {/* Redirect default to dashboard */}
            {/* <Route index element={<Navigate to="dashboard" />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
