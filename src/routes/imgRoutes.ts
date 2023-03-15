const multer  = require('multer')


const express = require('express')
const router = express.Router();
const { addImage, getAllImages, getSpecificImage, searchImages } = require('../controller/fileController')
const upload=multer({storage:multer.memoryStorage()})
router.post('/',upload.single('imageFile'),addImage)
router.get('/getAll',getAllImages)
router.get('/:id', getSpecificImage)
router.get('/search/:searchQuery',searchImages)
module.exports=router