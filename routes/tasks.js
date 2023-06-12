const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');

const router = express.Router();

// Store task in memory as an object for simplicity
const tasks = {};

// Validation schema for task
const taskSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
});

// Utility to validate a task
function validateUser(task) {
    const result = userSchema.validate(task);
    console.log(result);
    if (result.error) {
        return result.error.details[0].message;
    }
    return null;
}

// CREATE TASK
router.post('/', (req, res) => {
    const error = validateTask(req.body);
    if (error) {
        return res.status(400).send({
            error: "Invalid user data",
            details: error.replace(/^\s+/, '')
        });
    } else {
        const task = {
            id: uuid(),
            ...value,
        }

        tasks.push(task);
        res.status(200).json(tasks);
    }
});

// Retrieve a specific task
router.get('/:id', (req, res) => {
    const task = tasks[req.params.id]
    if (!task) {
        return res.status(404).send({
            error: "Task not found"
        });
    }
    res.json(task);
});

// Retrieve all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

//UPDATE task by id
router.put('/:id', (req, res) => {
    const error = validateTask(req.body);
    if (error) {
        return res.status(400).send({
            error: "Invalid task data"
        });
    }
    const task = tasks[req.params.id];
    if (!task) {
        return res.status(404).send({
            error: "task not found"
        });
    }
    tasks[req.params.id] = {
        ...task,
        ...req.body
    };
    res.json(tasks[req.params.id]);
});

// DELETE task by id
router.delete('/:id', (req, res) => {
    const task = tasks[req.params.id];
    if (!task) {
        return res.status(404).send({
            error: "task not found"
        });
    }
    delete tasks[req.params.id];
    res.status(204).end();
});

module.exports = router;