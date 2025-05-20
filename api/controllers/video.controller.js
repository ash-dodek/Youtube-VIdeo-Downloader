const {spawn} = require('child_process')
const path = require('path')
const crypto = require('crypto')


const generateRandomID = (length = 4) => {
    return crypto.randomBytes(length).toString('hex')
}

const downloadVideos = async (req, res) => {
    try {
        const quality = 144

        //generates id, which will the video name(very useful)
        const id = generateRandomID() 

        const link = 'https://www.youtube.com/watch?v=S5EpsMjel-M&t=2582s'

        //arguments that will be pased in the yt-dlp command
        /*
        -P sets the path where the files will be downloaded related to that video
        -f defines the specifications of the video, like height = 360 means video with 360p quality, ext = mp4 means video extension mp4, combined with best audio quality available
        -o denotes the file name that will be set
        link passed video link in the end
        */
        const arrayOfArgs = ["-P", `./downloads/${id}`,
            "-f", `bestvideo[height=${quality}][ext=mp4]+bestaudio[ext=m4a]`,
            "-o", `${id}.%(ext)s`,
            link]

        const downloader = spawn(`yt-dlp`, arrayOfArgs)

        downloader.stdout.on('data', (data) => {
            process.stdout.write(data)
        })
        downloader.stderr.on('data', (data) => {
            process.stderr.write(data)
        })

        downloader.on('close', (code) => {

            if(code === 0) {
                console.log("================= Process done =================")
                const absoultePath = path.join(__dirname, `../downloads/${id}/${id}.mp4`)
                res.sendFile(absoultePath)
                
            }
            else{
                res.status(500).json(
                    {
                        success:false, 
                        message:"Error: Some error occured while downloading the video",
                    }
                )
            }

        })
        

    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})
        console.log("Error:", error)
    } 
}   


const getVideoInformation = (req, res) => {
    try {
        const { link } = req.body
        let output = '', error = ''
        //-J arg means that the output is in JSON
        const ytDlp = spawn('yt-dlp', ['-J', link])

        ytDlp.stdout.on('data', (data) => {
            output += data.toString();
        })
        ytDlp.stderr.on('data', (data) => {
            error += data.toString()
        })
        ytDlp.on('close', (code) => {
            if(code === 0) {
                const json = JSON.parse(output)
                const formats = json.formats
                //using map so that we could detect by key and values of the size related to quality
                let qualities = new Map()
                // .thumbnail, .duration_string .fulltitle .like_count .view_count
                
                formats.forEach(format => {
                    if(format.vcodec !== 'none' && format.height) {
                        const size = format.filesize || format.filesize_approx;
                        if(size && !qualities.has(format.height)){
                            qualities.set(format.height, size/1000000)
                        }
                    }
                });
                const qualityArray = [...qualities]
                res.status(200).json({
                        message:"Success",
                        title: json.title,
                        views: json.view_count,
                        thumbnail_url: json.thumbnail,
                        duration: json.duration_string,
                        qualities: qualityArray
                    })
            }
            else{
                console.log("Error occured")
                res.status(500).json({success:false, message:"Some error occured in downloading the file"})
            }
        })

    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})
        console.log(error)
    }
}

module.exports = {downloadVideos, getVideoInformation}
