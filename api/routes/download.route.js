const express = require('express')
const { downloadVideos, getVideoInformation } = require('../controllers/video.controller')
const { deleteAllFiles } = require('../controllers/files.controller')
const router = express.Router()

router.get('/download', downloadVideos)

router.delete('/deleteall', deleteAllFiles)

router.get('/qualities', getVideoInformation)


module.exports = router