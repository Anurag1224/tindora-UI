import React from 'react'
import NavBar from './NavBar'
import Login from './Login'
import Profile from './Profile'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div> 
      <NavBar />
      <Outlet/>
      <Footer/>
    </div>
    
   
  )
}

export default Body