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
  const qr_png = qr.image(url);
  const qrBase64 = qr_png.toString('base64');
  
  res.send(`
    <html>
      <body>
        <h2>QR Code Generated!</h2>
        <img src="data:image/png;base64,${qrBase64}" id="qrImage">
        <br><br>
        <button onclick="downloadQR()">Download QR Code</button>
        <script>
          function downloadQR() {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = document.getElementById('qrImage').src;
            link.click();
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});