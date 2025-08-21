# QR Code Generator 📱

A simple web-based QR code generator built with Node.js and Express while learning and revising fundamental backend concepts.

## 🌐 Live Demo
👉 **[Try it live here!](https://qr-generator-production-a772.up.railway.app/)**

## 🎯 Project Overview

This mini project was created as a hands-on practice to revise and solidify Node.js and Express.js concepts. It demonstrates a complete web application workflow from form submission to dynamic response generation.

## ✨ Features

- **Simple Web Interface**: Clean HTML form for URL input
- **Real-time QR Generation**: Instantly generates QR codes from any URL
- **Visual Feedback**: Displays the generated QR code immediately
- **File Operations**: Saves URLs to text files (learning file system operations)
- **Express Routing**: Demonstrates GET and POST route handling

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **qr-image**: QR code generation library
- **Morgan**: HTTP request logger middleware
- **HTML/CSS**: Frontend user interface

## 📚 Concepts Practiced

### Node.js Fundamentals:
- ES6 module imports (`import`/`export`)
- File system operations (`fs.writeFile`)
- Path manipulation (`dirname`, `fileURLToPath`)
- Environment variables (`process.env.PORT`)

### Express.js Features:
- **Middleware**: Body parser, static files, logging
- **Routing**: GET and POST request handling
- **Request/Response**: Processing form data, sending files
- **Static Assets**: Serving CSS, images, and HTML files

### Web Development:
- Form data handling (`req.body`)
- File uploads and serving
- HTML template generation
- Error handling and validation

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd qr-code-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3500
   ```

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "morgan": "^1.10.0",
  "qr-image": "^3.2.0"
}
```

## 📁 Project Structure

```
qr-code-generator/
├── public/
│   ├── index.html      # Main HTML form
│   ├── qr.png         # Generated QR code (created dynamically)
│   └── style.css      # Styling (if added)
├── index.js           # Main server file
├── package.json       # Project configuration
├── URL.txt           # Saved URLs (created dynamically)
└── README.md         # This file
```

## 🔧 How It Works

1. **User visits the homepage** (`GET /`)
   - Express serves the HTML form from `public/index.html`

2. **User submits URL** (`POST /generated`)
   - Express processes form data using `express.urlencoded()` middleware
   - Extracts URL from `req.body.URL`

3. **QR Code Generation**
   - Uses `qr-image` library to create PNG image
   - Saves QR code to `public/qr.png` using file streams

4. **Response**
   - Sends HTML response with embedded QR code image
   - Saves URL to `URL.txt` for record-keeping

## 🌐 Deployment

The application is successfully deployed on Railway and accessible at:
**https://qr-generator-production-a772.up.railway.app/**

### Deployment Platforms Used:
- **Railway**: Easy deployment with GitHub integration
- **Environment Variables**: `PORT` configuration for cloud platforms

## 🎓 Learning Outcomes

Through building this project, I practiced and reinforced:

- **Server Setup**: Creating Express applications from scratch
- **Middleware**: Understanding the middleware stack and order
- **Route Handling**: Implementing GET and POST endpoints
- **File Operations**: Reading/writing files in Node.js
- **Form Processing**: Handling HTML form submissions
- **Static Assets**: Serving images and stylesheets
- **Error Handling**: Basic validation and error responses
- **Deployment**: Taking a local app to production

## 🔍 Code Highlights

### Express Middleware Stack:
```javascript
app.use(express.urlencoded({extended: true}));  // Parse form data
app.use(express.static('public'));              // Serve static files
app.use(morgan("dev"));                         // Log HTTP requests
```

### Dynamic QR Generation:
```javascript
const qr_png = qr.image(url);
qr_png.pipe(fs.createWriteStream('public/qr.png'));
```

### Form Data Processing:
```javascript
app.post("/generated", (req, res) => {
  const url = req.body.URL;  // Extract from form
  // Generate QR and respond
});
```

## 🚧 Future Enhancements

- Add input validation and sanitization
- Implement QR code customization (size, colors)
- Add download functionality for QR codes
- Store generation history in a database
- Add API endpoints for programmatic access
- Implement rate limiting for production use

## 📝 Notes

This project serves as a practical revision of Node.js and Express fundamentals. It demonstrates the complete flow of a web application while keeping the scope manageable for learning purposes.

---

**Built with ❤️ while learning Node.js & Express.js**
