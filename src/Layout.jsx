import React from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout