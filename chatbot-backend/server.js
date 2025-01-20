const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Chatbot backend is running!');
});

app.post('/message', async (req, res) => {
    const userQuery = req.body.query;
    try {
        const reply = await db.getResponse(userQuery);
        res.json({ reply: reply || "I don't understand that yet." });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
