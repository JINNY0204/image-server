const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig');
const { uploadImage, getImage } = require('../controllers/imageController');

router.post('/uploadimage', upload.single('imgfile'), uploadImage);
router.get('/getimage/:filename', getImage);

module.exports = router;
