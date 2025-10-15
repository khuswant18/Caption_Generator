const express = require('express');
const transcribeRoute = require('./routes/transcribe.routes');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
    process.env.FRONTEND_URL_1 || 'http://localhost:3000',
    process.env.FRONTEND_URL_2 || 'http://localhost:3001'
];

app.use(
    cors({ 
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Caption Generator API is running' });
});


app.use('/api/v1/transcribe', transcribeRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
