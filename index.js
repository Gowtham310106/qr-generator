import express from "express";
import morgan from "morgan";
import qr from "qr-image";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3500;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post("/generated", (req, res) => {
  const url = req.body.URL; // Get URL from form submission
  
  if (!url) {
    return res.status(400).send("URL is required");
  }
  
  // Generate QR code when form is submitted
  const qr_png = qr.image(url);
  qr_png.pipe(fs.createWriteStream('public/qr.png'));
  
  // Save URL to file
  fs.writeFile("URL.txt", url, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  
  // Send response back to user
  res.send(`
    <html>
      <body>
        <h2>QR Code Generated!</h2>
        <p>URL: ${url}</p>
        <img src="/qr.png" alt="QR Code" style="max-width: 300px;">
        <br><br>
        <a href="/">Generate Another QR Code</a>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});