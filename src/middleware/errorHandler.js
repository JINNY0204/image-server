const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
    res.status(404).json({
        success: false,
        message: 'no file error'
    });
};

module.exports = errorHandler;
