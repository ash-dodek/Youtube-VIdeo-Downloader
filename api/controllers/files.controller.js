const path = require('path')
const fs = require('fs')
const {spawn} = require('child_process')

const deleteAllFiles = (req, res) => {
    try {
        const deleter = spawn("rm", ["-r", "./downloads/*"], {shell:true})

        deleter.stdout.on('data', (data) => {
            process.stdout.write(data)
        })
        deleter.stderr.on('data', (data) => {
            process.stderr.write(data)
        })

        deleter.on('close', (code) => {
            if(code === 0){
                console.log("Related Files deleted successfully")
                res.status(200).json({success:true, messagge: "Files deleted"})
            }
            else{
                console.log("Some error occured while deleting files")
                res.status(500).json({success:false, message:"Error while deleting files"})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).message({success:false, message:"Internal Server Error"})
    }
}

module.exports = {deleteAllFiles}