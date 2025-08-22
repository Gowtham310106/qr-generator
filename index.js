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
    
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QR Generated</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
            text-align: center;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h2 {
            color: #333;
            margin-bottom: 20px;
          }
          .url-display {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 5px;
            margin: 20px 0;
            word-break: break-all;
          }
          #qrImage {
            max-width: 250px;
            border: 2px solid #ddd;
            border-radius: 10px;
            margin: 20px 0;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
          button {
            padding: 12px 25px;
            margin: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
          }
          .download-btn {
            background-color: #28a745;
            color: white;
          }
          .download-btn:hover {
            background-color: #218838;
          }
          .back-btn {
            background-color: #007bff;
            color: white;
          }
          .back-btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🎉 QR Code Generated Successfully!</h2>
          <div class="url-display">
            <strong>URL:</strong> ${url}
          </div>
          <img src="data:image/png;base64,${qrBase64}" id="qrImage" alt="QR Code">
          <br>
          <button class="download-btn" onclick="downloadQR()">📥 Download QR Code</button>
          <button class="back-btn" onclick="location.href='/'">🔄 Generate Another</button>
        </div>
        
        <script>
          function downloadQR() {
            const link = document.createElement('a');
            link.download = 'qrcode-${Date.now()}.png';
            link.href = document.getElementById('qrImage').src;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        </script>
      </body>
      </html>
    `);
    
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