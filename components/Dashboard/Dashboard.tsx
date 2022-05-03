import Image from 'next/image'
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const authData = useAuth()
  const user = authData?.user

  return (
    <>
      <div>Dashboard</div>
      <div>
        {user && user.photoURL && (
          <>
            <Image src={user.photoURL} width="100px" height="100px" alt="userPhoto" />
            <div> displayName : {user.displayName} </div>
            <div> email : {user.email} </div>
            <div> photoURL : {user.photoURL} </div>
            <div>uid : {user.uid}</div>
          </>
        )}
      </div>
    </>
  )
}

export default Dashboard
