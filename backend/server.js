const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "client" directory (your frontend folder)
// Note the `../client` because the client folder is outside the backend folder
app.use(express.static(path.resolve(__dirname, '../client')));

// Sample API routes
app.get('/get_tasks', (req, res) => {
    // Fetch tasks from database or any source
    res.json([{ id: 1, task: 'Sample Task' }]); // Example response
});

app.post('/create_task', (req, res) => {
    // Logic to create a task
    const newTask = req.body;
    res.json(newTask); // Respond with the created task
});

app.post('/delete_tasks', (req, res) => {
    // Logic to delete a task
    const { id } = req.body;
    res.json({ success: true, id }); // Respond with success
});

// Catch-all route to serve index.html for any other routes (important for AngularJS routing)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
