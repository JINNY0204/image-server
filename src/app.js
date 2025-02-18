require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const corsOptions = require('./config/corsConfig');
const errorHandler = require('./middleware/errorHandler');
const imageRoutes = require('./routes/imageRoutes');
const { FOLDER_PATH } = require('./config/multerConfig');

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

// 환경변수 검증
if (!process.env.HOST) {
    console.warn('Warning: HOST not set in environment variables');
}

// uploads 폴더 생성
if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH, { recursive: true });
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(FOLDER_PATH));

// 라우트
app.use('/api', imageRoutes);

// 에러 핸들러
app.use(errorHandler);

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
    console.log(`Upload directory: ${FOLDER_PATH}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
});