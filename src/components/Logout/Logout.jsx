import { useAuth } from '@/context/authContext'
import React from 'react'

const Logout = () => {
  const {logout}=useAuth()
  console.log("Logout1233333333")
  // alert("Logout")
  
  return (
    <div>
      <span onClick={logout} style={{ color: 'red', cursor: 'pointer' }}>
        Logout
      </span>
    </div>
  )
}

export default Logout