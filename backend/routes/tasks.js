const express = require('express');
const router = express.Router();

// Sample task data (You can replace this with your database logic)
let tasks = [];

// GET all tasks
router.get('/get_tasks', (req, res) => {
    res.json(tasks);
});

// POST create a new task
router.post('/create_task', (req, res) => {
    const newTask = { id: Date.now(), task: req.body.task };
    tasks.push(newTask);
    res.json(newTask);
});

// POST delete a task by ID
router.post('/delete_tasks', (req, res) => {
    const taskId = req.body.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Task deleted successfully' });
});

module.exports = router;