import React from 'react'
import '../CSS/download.css'
import Button from './Button'

function DownloadPage() {

    const videoFormats = [
        { quality: "1080p", format: "MP4", size: "120MB" },
        { quality: "720p", format: "MP4", size: "80MB" },
        { quality: "480p", format: "MP4", size: "45MB" },
        { quality: "360p", format: "MP4", size: "30MB" },
        { quality: "Audio Only", format: "MP3", size: "8MB" },
    ]

  return (
    <div className='downloadPage'>
        <div className="videoInfo">
            <img src="thumbnail.jpg" id='thumbnail' alt="" />
            <div className="info">
                <h1 className="title">Amazing Youtube Video</h1>
                <div className="outer">

                    <div className="specialInfo">
                        <span class="material-symbols-outlined">
                        schedule
                        </span>
                        12:41
                    </div>
                    <div className="specialInfo">
                        <span class="material-symbols-outlined">
                            videocam
                        </span>
                        1M
                    </div>
                    
                </div>
            </div>
        </div>
        <h3>Available Downloads</h3>
        <div className="available">
            <table className="downloadTable">
                <thead>
                <tr>
                    <th>Quality</th>
                    <th>Format</th>
                    <th>Size</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {videoFormats.map((item, index) => (
                    <tr key={index}>
                    <td>{item.quality}</td>
                    <td>{item.format}</td>
                    <td>{item.size}</td>
                    <td>
                        <Button className='btnIcon' color="white" bgColor="#6c62fe" icon='download' text="Download"/>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default DownloadPage