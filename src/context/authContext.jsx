import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      setLoading(false);
      return;
    }

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const verifyUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.user) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};




// // ✅ Use `useNavigate` inside a custom hook
// export const useAuth = () => {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!auth.loading) {
//       if (!auth.user) {
//         navigate("/login");
//       } else if (auth.user.role === "admin") {
//         navigate("/admin-dashboard");
//       } else if (auth.user.role === "employee") {
//         navigate("/employee-dashboard");
//       } else {
//         console.warn("Invalid role detected. Clearing token and redirecting to login.");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//       }
//     }
//   }, [auth.user, auth.loading, navigate]);

//   return auth;
// };

// ✅ Use useNavigate inside a custom hook
export const useAuth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    if (!auth.loading) {
      if (!auth.user) {
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      } else if (auth.user.role === "admin" && !location.pathname.startsWith("/admin-dashboard")) {
        navigate("/admin-dashboard", { replace: true });
      } else if (auth.user.role === "employee" && !location.pathname.startsWith("/employee-dashboard")) {
        navigate("/employee-dashboard", { replace: true });
      }
    }
  }, [auth.user, auth.loading, navigate, location.pathname]); // Track location to prevent unnecessary redirects

  return auth;
};



// modify useAuth hook in authContext.js to above code

export default AuthProvider;




















// import axios from "axios";
// import React, {  useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";


// // const AuthContext = createContext(); // Fixed naming

// export const AuthContext = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.warn("No token found in localStorage");
//           setUser(null); // Ensure user state is cleared if no token is found
//           return;
//         }
//         // console.log("Token", token);
//         if (token) {
//           const response = await axios.get("http://localhost:3000/api/auth/verify", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
          
//           if (response.data.user) {
//             setUser(response.data.user);
//             localStorage.setItem("user", JSON.stringify(response.data.user)); // Ensure user is stored in localStorage
//           } else {
//             setUser(null);
//             localStorage.removeItem("user"); // Clear user from localStorage if verification fails
//          setLoading(false);
//           }
//         }
//       } catch (error) {
//         console.log("Error verifying user:", error);
//         setUser(null);
//       }
//     };
//     verifyUser();
//   }, []); // Ensure verifyUser runs only once on component mount

//   const login = (userData) => {
//     console.log("Login", userData);
//     setUser(userData);
//     if (userData?.token) {
//       localStorage.setItem("token", userData.token);
//     }
//     localStorage.setItem("user", JSON.stringify(userData)); 
//   };

//   const logout = () => {
//     console.log("Logout");
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//   };

  

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const navigate = useNavigate();
//   const auth = useContext(AuthContext);

//   useEffect(() => {
//     if (auth.user) {
//       if (auth.user.role === "admin") {
//         navigate("/admin-dashboard");
//       } else if (auth.user.role === "employee") {
//         navigate("/employee-dashboard");
//       }
//     }
//   }, [auth.user, navigate]);

//   return auth;
// };

// export default AuthContext;
