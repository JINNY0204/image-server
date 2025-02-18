// const corsOptions = {
//     origin: [
//         'http://localhost:8080'
//     ],
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
// };

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};
module.exports = corsOptions;

module.exports = corsOptions;
