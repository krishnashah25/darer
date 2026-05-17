const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Import and use API routes
const registerRoute = require('./backend/api/register');
app.use('/api', registerRoute);

const loginRoute = require('./backend/api/login');
app.use('/api', loginRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);

});