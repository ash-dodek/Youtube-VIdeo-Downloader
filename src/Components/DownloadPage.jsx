import React, { useContext, useRef } from 'react'
import '../CSS/download.css'
import Button from './Button'
import {VideoContext} from '../Context/VideoContext'

function DownloadPage() {

    const {data, loading, VideoDownloader,link, isDownloading, setIsDownloading} = useContext(VideoContext)
    
    const spinnerRef = useRef(null)

    if(loading === true || !data) {
        return (
            <div className='beingLoaded'>
                <h1>THE CONTENT IS BEING LOADED</h1>
                <span className="loader"></span>
            </div>
        )
    }

    let noOfViews
    if(data.views >= 1000000000) {
        noOfViews = (data.views/1000000000).toFixed(1).toString() + 'B'
    }
    else if( data.views >= 1000000 && data.views < 1000000000) {
        noOfViews = (data.views/1000000).toFixed(1).toString() + 'M'
    }
    else if(data.views >= 1000 && data.views < 1000000){
        noOfViews = (data.views/1000).toFixed(1).toString() + 'K'
    }
    else{
        noOfViews = (data.views).toFixed(1).toString()
    }
    
    const onDownload = async (quality) => {

        console.log(quality)
        const element = spinnerRef.current
        console.log(element.style.display)
        if(element.style.display == 'none'){
            console.log("setting it")
            element.style.display = 'flex'
        }
        spinnerRef.current.scrollIntoView({behavior: 'smooth'})
        await VideoDownloader(quality, link, data.title)

        alert("Video Has Been Downloaded!")
        element.style.display = 'none'
    }

    return (
        <>
    <div className='downloadPage'>
        <div className="videoInfo">
            <img src={data.thumbnail_url} id='thumbnail' alt="" />
            <div className="info">
                <h1 className="title">{data.title}</h1>
                <div className="outer">

                    <div className="specialInfo">
                        <span class="material-symbols-outlined">
                        schedule
                        </span>
                        {data.duration}
                    </div>
                    <div className="specialInfo">
                        <span class="material-symbols-outlined">
                            videocam
                        </span>
                        {noOfViews}
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
                {data.qualities.map(([quality, size], index) => (
                    <tr key={index}>
                        <td>{quality}p</td>
                        <td>MP4</td>
                        <td>{size === "NA" ? "N.A." : `${size.toFixed(2)} MB`}</td>
                        <td>
                            <Button onClick={() => onDownload(quality)} className='btnIcon' color="white" bgColor="#6c62fe" icon='download' text="Download"/>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    </div>
    <div style={{display:'none'}} ref={spinnerRef} className="status">
        <h1>Your video is downloading</h1>
        <span className="loader"></span>
    </div>
    </>
  )
}

export default DownloadPage