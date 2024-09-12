import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
    const { url, headers = {} } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is missing from the request body" });
    }

    try {
        const response = await fetch(url, { headers });
        const content = await response.text();
        return res.json({ ok: response.ok, content });
    } catch (error) {
        return res.status(500).json({ ok: false, content: `Request failed: ${error.message}` });
    }
});

const PORT = 8000;
app.listen(PORT);
