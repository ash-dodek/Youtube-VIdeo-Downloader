import { useState } from 'react'
import Navbar from './Components/Navbar'
import './universal.css'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import DownloadPage from './Components/DownloadPage'
import {VideoProvider} from './Context/VideoContext.jsx'

function App() {
  
  
  return (
    <>
    <BrowserRouter>
    <VideoProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>

          <Route path='/download' element={<DownloadPage/>}/>
          {/* <Navbar/>
          <Home/> */}

        </Route>
      </Routes>
    </VideoProvider>
    </BrowserRouter>
    </>
  )
}

export default App
