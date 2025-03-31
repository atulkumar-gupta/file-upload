const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/File');

const router = express.Router();

// Configure Storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Upload API
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { filename, path: filePath, mimetype, size } = req.file;
        const newFile = new File({ filename, path: filePath, mimetype, size });
        await newFile.save();
        res.json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        res.status(500).json({ message: 'File upload failed', error });
    }
});

module.exports = router;
