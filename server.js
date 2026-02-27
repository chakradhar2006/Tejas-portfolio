const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS, images) from this folder
app.use(express.static(__dirname));

// Parse JSON bodies
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Name, email, and message are required.',
        });
    }

    const entry = [
        '------------------------------',
        new Date().toISOString(),
        `Name: ${name}`,
        `Email: ${email}`,
        `Message: ${message}`,
        '',
    ].join('\n');

    const messagesFile = path.join(__dirname, 'messages.txt');

    fs.appendFile(messagesFile, entry, (err) => {
        if (err) {
            console.error('Failed to save contact message:', err);
            return res.status(500).json({
                success: false,
                error: 'Failed to save your message. Please try again later.',
            });
        }

        return res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Tejas portfolio backend running at http://localhost:${PORT}`);
});

