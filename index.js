import express from "express";
import morgan from "morgan";
import qr from "qr-image";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3500;
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
  
  try {
    // Generate QR code as base64
    const qr_png = qr.imageSync(url, { type: 'png' });
    const qrBase64 = qr_png.toString('base64');
    
    res.sendFile(__dirname + '/public/qr.html');
    
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).send(`
      <h2>Error generating QR code</h2>
      <p>Please try again with a valid URL</p>
      <a href="/">Go Back</a>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});