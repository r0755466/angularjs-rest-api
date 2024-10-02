const express = require('express');  // Importing the Express framework
const bodyParser = require('body-parser'); // Middleware for parsing JSON bodies
const cors = require('cors'); // Middleware for enabling CORS
const path = require('path'); // Utility for working with file and directory paths

const app = express(); // Create an Express application
const port = process.env.PORT || 3000; // Define the port, using 3000 if not set in the environment

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Serve static files from the AngularJS app
app.use(express.static(path.join(__dirname, 'client'))); // Serve files in the 'client' directory

// Fallback route to serve the index.html file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html')); // Send index.html for any route not defined
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log the server status
});
