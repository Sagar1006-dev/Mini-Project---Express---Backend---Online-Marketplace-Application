const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');

const router = express.Router();

// Store assignTask in memory as an object for simplicity
const assignTask = {};

// Validation schema for assignTask
const assignTaskSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
});

// Utility to validate an assignTask
function validateAssignTask(assignTask) {
    const result = assignTaskSchema.validate(assignTask);
    console.log(result);
    if (result.error) {
        return result.error.details[0].message;
    }
    return null;
}

// Assign task
const assigndTask = (payload) => {
    assignTaask.push(payload);
};

// Unassign task
const unassignTask = (payload) => {
    assignTask.filter(assigntask => assignTask.id !== id);
};

// Assign task
router.post('/', (req, res) => {
    const error = validateAssignTask(req.body);
    if (error) {
        return res.status(400).send({
            error: "Invalid user data",
            details: error.replace(/^\s+/, '')
        });
    } else {
        const payload = {
            id: uuid(),
            ...value,
        }

        assignTask(payload);
        res.status(200).json(assignedTask);
    }
});

// Unassigned task by id
router.delete('/:id', (req, res) => {
    unassignTask(req.params.id);
    res.json(tasks);
});

// Get all assigned tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

module.exports = router;