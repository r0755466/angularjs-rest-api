const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/get_tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany(); // Assuming you have a Task model
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});


app.post('/delete_tasks', async (req, res) => {
    const { id } = req.body;
    try {
        await prisma.task.delete({
            where: { id: Number(id) }, // Ensure the ID is a number
        });
        res.sendStatus(204); // No content to send back
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// we want to start the server 
const PORT  = 5000; 

app.listen(PORT, () => {
console.log('Server is running on the http://localhost${PORT}');
}); 



