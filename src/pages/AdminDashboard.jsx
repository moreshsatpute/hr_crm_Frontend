import { useAuth } from '@/context/authContext'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutTheme from '../components/LayoutTheme'

function AdminDashboard() {
  const {user}=useAuth()
  const navigate =useNavigate() 
  if (!user) {
    navigate('/login')
  }
  return (
    <div>    
      {/* Admin---X---Dashboard {user?.name} */}
    <LayoutTheme role={user}/>
   
    </div>

  )
}

export default AdminDashboard