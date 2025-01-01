import express from 'express';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-banner', (req, res) => {
    const { name, backgroundColor, textColor } = req.body;

    const canvas = createCanvas(800, 200);
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = backgroundColor || '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.fillStyle = textColor || '#FFF';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(name || 'Profile Name', canvas.width / 2, canvas.height / 2 + 15);

    // Send the image as a response
    res.setHeader('Content-Type', 'image/png');
    canvas.createPNGStream().pipe(res);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});