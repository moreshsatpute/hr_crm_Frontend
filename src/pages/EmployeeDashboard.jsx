import { useAuth } from '@/context/authContext'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import LayoutTheme from '../components/LayoutTheme';

const EmployeeDashboard = () => {
  // const {user}=useAuth();
  // return (
  //   <div>
  //     EmployeeDashboard  {user?.name}

  //     <h1>hello</h1>
  //   {/* <Layout role={user}/> */}
  //   </div>
  // )

  const {user}=useAuth()
  const navigate =useNavigate() 
  if (!user) {
    navigate('/login')
  }
  return (
    <div>    
      {/* EmployeeDashboard {user?.name} */}
    <LayoutTheme role={user}/>
   
    </div>

  )
}

export default EmployeeDashboard