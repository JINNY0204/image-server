const multer = require('multer');
const path = require('path');
const FOLDER_PATH = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, FOLDER_PATH);
    },
    filename: function(req, file, callback) {
        // 클라이언트가 지정한 파일명 사용
        const clientFileName = req.body.fileName || file.originalname;
        callback(null, clientFileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 4 * 1024 * 1024
    }
});

module.exports = {
    upload,
    FOLDER_PATH
};
