import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Admin/Dashboard";
import LayoutTheme from "./components/LayoutTheme";
import Employees from "./components/Admin/Employees";
import Departments from "./components/Admin/Departments";
import Leaves from "./components/Admin/Leaves";
import Salary from "./components/Admin/Salary";
import Setting from "./components/Admin/Setting";
import Login from "./components/Login";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
        
        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <LayoutTheme role={{ name: "Admin" }} />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="salary" element={<Salary />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Employee Dashboard Routes (if applicable) */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                <LayoutTheme role={{ name: "Employee" }} />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Employees />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="salary" element={<Salary />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
