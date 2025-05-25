import React, { useContext, useEffect } from 'react'
import '../CSS/home.css'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { VideoContext } from '../Context/VideoContext'

function Home() {

  const {link, setLink} = useContext(VideoContext)
  const navigate = useNavigate()
  useEffect(() => {
    setLink("")
  }, [])
  
  const onInputChange = (e) => {
    setLink(e.target.value)
  }

  setLink(link.trim())

  const onLinkSubmit = () => {
    let isValidLink = false
   if(
      (link.startsWith('https://www.youtube.com/watch') ||
      link.startsWith('https://youtube.com/watch') ||
      link.startsWith('https://youtu.be/')) &&
      link !== ""
    ) {
      navigate('/download')
    }
    else{
      alert("Video Link is Invalid")
    }
  }

  return (
    <div className='homePage'>
        <div className="texts">
            <h1>Youtube Video Downloader</h1>
            <p>Simply paste a YouTube URL and convert videos to MP4, MP3 in the highest quality.</p>
        </div>
        <div className="input">
            <input onChange={onInputChange} type="text" name="" id="linkArea" />
            {/* <Link to='/download'> */}
                <Button onClick={onLinkSubmit} color="white" bgColor='#7537dc' text='Download Video'/>
            {/* </Link> */}
        </div>
    </div>
  )
}

export default Home