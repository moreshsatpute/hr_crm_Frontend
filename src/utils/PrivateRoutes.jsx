import { useAuth } from '@/context/authContext'
// import React from 'react'
// import { Navigate } from 'react-router-dom'

// const PrivateRoutes = ({children}) => {
//     const {user, loading}=useAuth()

//     if(loading){
//         return <div>Loading...</div>
//     }

//     return user ? children : <Navigate to="/login"/>
// }

// export default PrivateRoutes;


import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
//   const isAuthenticated = !!localStorage.getItem("token");
  const {user, loading}=useAuth()

  if(loading){
    return <div>Loading...</div>
}

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
