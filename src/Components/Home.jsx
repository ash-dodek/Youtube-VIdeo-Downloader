import React from 'react'
import '../CSS/home.css'
import Button from './Button'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='homePage'>
        <div className="texts">
            <h1>Youtube Video Downloader</h1>
            <p>Simply paste a YouTube URL and convert videos to MP4, MP3 in the highest quality.</p>
        </div>
        <div className="input">
            <input type="text" name="" id="linkArea" />
            <Link to='/download'>
                <Button color="white" bgColor='#7537dc' text='Download Video'/>
            </Link>
        </div>
    </div>
  )
}

export default Home