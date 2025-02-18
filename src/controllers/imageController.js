const fs = require('fs');
const path = require('path');
const { FOLDER_PATH } = require('../config/multerConfig');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            console.log('Upload failed: No file received');
            return res.status(400).json({ 
                success: false, 
                message: 'No file uploaded' 
            });
        }

        if (req.file.size > 4 * 1024 * 1024) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: 'File too large'
            });
        }

        console.log('File uploaded:', req.file.path);
        res.json({
            success: true,
            imageUrl: `http://${process.env.HOST}:${process.env.PORT}/uploads/${req.file.filename}`,
            fileName: req.file.filename,
            size: req.file.size
        });

    } catch (error) {
        console.error('Upload error:', error);
        if (req.file?.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (cleanupError) {
                console.error('Cleanup error:', cleanupError);
            }
        }
        res.status(500).json({
            success: false,
            message: 'Upload failed'
        });
    }
};

const getImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        
        if (!filename) {
            return res.status(400).json({ 
                success: false, 
                message: 'Filename is required' 
            });
        }

        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = path.extname(filename).toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid file extension' 
            });
        }

        const sanitizedFilename = path.basename(filename);
        const filePath = path.join(FOLDER_PATH, sanitizedFilename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ 
                success: false, 
                message: 'File not found' 
            });
        }

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('File send error:', err);
                res.status(500).json({ 
                    success: false, 
                    message: 'Error sending file' 
                });
            }
        });

    } catch (error) {
        console.error('Get image error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
};

module.exports = {
    uploadImage,
    getImage
};
