import React from 'react'
import '../CSS/navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
        <span id='navIcon' class="material-symbols-outlined">
        download
        </span>
        <div className="pages">
            <div className="page">About</div>
            <div className="page">FAQ</div>

        </div>
    </div>
  )
}

export default Navbar