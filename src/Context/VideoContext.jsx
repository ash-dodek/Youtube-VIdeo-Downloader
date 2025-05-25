import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const apiURL = import.meta.env.VITE_API_URL

const VideoContext = createContext(null)

const VideoProvider = ({children}) => {
    const [link, setLink] = useState("")
    const [isDownloading, setIsDownloading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)// sets to loading when data starts fetching
        try {
            const res = await fetch(apiURL+'/downloader/qualities', {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({
                    link: link,
                })
            })
            const jsonData = await res.json()
            setData(jsonData)
            console.log(jsonData)
        } catch (error) {
            console.log("error ", error)
        }
        finally{   
            setLoading(false)
        }
      }
      
      if(location.pathname == '/download'){
        if(!link){
            return navigate('/')
        }
        fetchData()
      }
    }, [location.pathname])


    const VideoDownloader = async (quality, link, videoTitle) => {
        setIsDownloading(true)
        try {
            
            const res = await fetch(apiURL+'/downloader/download', {
                method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({
                link: link,
                quality: quality,
                videoTitle: videoTitle
            })
        })
            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${videoTitle}.mp4`
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)


        } catch (error) {
            alert("Some error occured", error)
        }
        finally{
            setIsDownloading(false)
        }

    }

    return (
        <VideoContext.Provider value={{data, loading, link, setLink, VideoDownloader, isDownloading, setIsDownloading}}>
            {children}
        </VideoContext.Provider>
    )
}

export {VideoContext, VideoProvider}