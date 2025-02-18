const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const FOLDER_PATH = path.join(__dirname, 'uploads');
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(FOLDER_PATH));

//저장 경로, 파일이름 설정
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, FOLDER_PATH);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({
  storage: storage
});

//이미지 업로드(경로에 저장) 라우트
app.post('/api/uploadimage', upload.single('imgfile'), (req, res) => {
  if (!req.file) {
    console.log('upload failed');
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }
  console.log('File uploaded:', path.join(__dirname, 'uploads', req.file.filename));
  res.json({
    success: true,
    imageUrl: `http://192.168.0.50:${PORT}/uploads/${req.file.filename}`
  });
});

// 이미지 전송 라우트
app.get('/api/getimage/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(FOLDER_PATH, filename);
  res.sendFile(filePath);
});
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});