import express from "express";
import morgan from "morgan";
import qr from "qr-image";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3500; // Railway sets PORT automatically
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post("/generated", (req, res) => {
  const url = req.body.URL;
  
  if (!url) {
    return res.status(400).send("URL is required");
  }
  
  // Generate QR as base64 instead of file
  const qr_png = qr.imageSync(url, { type: 'png' });
  const qrBase64 = qr_png.toString('base64');
  
  res.send(`
    <html>
      <body>
        <h2>QR Code Generated!</h2>
        <p>URL: ${url}</p>
        <img src="data:image/png;base64,${qrBase64}" alt="QR Code" style="max-width: 300px;">
        <br><br>
        <a href="/">Generate Another QR Code</a>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});