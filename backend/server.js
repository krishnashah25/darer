const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB with fallback capability
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/darer';
console.log(`[SERVER] Attempting to connect to MongoDB at: ${mongoUri.replace(/:([^@]+)@/, ':****@')}`);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout early to trigger fallback
})
.then(() => {
  console.log('[SERVER] Successfully connected to MongoDB database!');
})
.catch((err) => {
  console.warn('\n⚠️ [SERVER WARNING] MongoDB connection failed! Error:', err.message);
  console.warn('⚠️ [SERVER WARNING] Falling back to IN-MEMORY MOCK DATABASE mode.');
  console.warn('⚠️ All user creations, registration, and logins will be cached in active server memory.\n');
});

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mount API routes
const registerRoute = require('./api/register');
app.use('/api', registerRoute);

const loginRoute = require('./api/login');
app.use('/api', loginRoute);

// Serve static React production bundle from frontend-react/dist
const distPath = path.join(__dirname, '../frontend-react/dist');
app.use(express.static(distPath));

// For React routing - return index.html for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      // If the static front-end build is not generated yet, show a friendly status page
      res.status(200).send(`
        <body style="background:#000;color:#00fff7;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;">
          <h1 style="text-shadow:0 0 10px #00fff7;">DARER BACKEND ONLINE</h1>
          <p style="color:#fff;">The API is operational. Run Vite React to see the interface!</p>
          <div style="background:#111;border:1px solid #ff00ff;padding:15px 30px;border-radius:8px;box-shadow:0 0 10px #ff00ff55;margin-top:20px;">
            <p style="margin:0;font-size:13px;color:#aaa;">Vite Frontend: <strong>npm run dev</strong> (Port 5173)</p>
            <p style="margin:8px 0 0 0;font-size:13px;color:#aaa;">Express Backend API: <strong>Port 3000</strong></p>
          </div>
        </body>
      `);
    }
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`[SERVER] Express Server running at: http://localhost:${PORT}`);
});
