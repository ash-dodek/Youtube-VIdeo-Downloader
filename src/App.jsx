import { useState } from 'react'
import Navbar from './Components/Navbar'
import './universal.css'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import DownloadPage from './Components/DownloadPage'

function App() {
  
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>

          <Route path='/download' element={<DownloadPage/>}/>
          {/* <Navbar/>
          <Home/> */}

        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
