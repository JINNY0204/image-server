const corsOptions = {
    origin: [
        'http://localhost:8080',
        'http://192.168.0.2:8080'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

module.exports = corsOptions;
