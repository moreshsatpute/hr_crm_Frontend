import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuth } from "@/context/authContext";


  const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {login}=useAuth()
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted", formData);
      setLoading(true);
  
      try {
        const response = await axios.post(
          "http://localhost:3030/api/auth/login",
          formData
        );
        console.log("Login response:", response.data);
        alert("Login successful!");
        // console.log("User role:", response.data?.user?.role || "undefined"); // Debugging log
        // if (response.data?.user?.role && response.data?.user?.role?.toLowerCase() === "admin") {
        //   navigate("/admin-dashboard");
        // } else {
        //     navigate("/employee-dashboard");
        // }
        // localStorage.setItem("token", response.data.token);
        // login(response.data.user);
        
        if (response.data.success) {
          console.log("Login successful");
          login(response.data.user)
          localStorage.setItem("token", response.data.token);
          if (response.data?.user?.role && response.data?.user?.role.toLowerCase() === "admin") {
            console.log("Admin login")
            navigate("/admin-dashboard");
          }else{
            console.log("Employee login")
            navigate("/employee-dashboard");
        }}
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please check password and email.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Login</h2>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? (
                <span className="animate-spin border-t-2 border-white border-solid rounded-full h-5 w-5 inline-block"></span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
