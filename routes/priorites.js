const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');

const router = express.Router();

// Store priority in memory as an object for simplicity
const priority = {};

// Validation schema for user
const prioritySchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
});

// Utility to validate a priority
function validatePriority(priority) {
    const result = prioritySchema.validate(priority);
    console.log(result);
    if (result.error) {
        return result.error.details[0].message;
    }
    return null;
}

// Create a new priority
router.post('/', (req, res) => {
    const error = validatePriority(req.body);
    if (error) {
        return res.status(400).send({
            error: "Invalid priority data",
            details: error.replace(/^\s+/, '')
        });
    } else {
        const priority = {
            id: uuid(),
            ...value,
        }

        priorites.push(priority);
        res.status(200).json(priorites);
    }
});

// Retrieve a specific priority
router.get('/:id', (req, res) => {
    const priority = priorites[req.params.id];
    if (!priority) {
        return res.status(404).send({
            error: "Priority not found"
        });
    }
    res.json(priority);
});

// Retrieve all priorites
router.get('/', (req, res) => {
    res.json(priorites);
});

// Update a specific priority
router.put('/:id', (req, res) => {
    const error = validatePriority(req.body);
    if (error) {
        return res.status(400).send({
            error: "Invalid priority data"
        });
    }
    if (!priority) {
        return res.status(404).send({
            error: "Priority not found"
        });
    }
    priorities[req.params.id] = {
        ...priority,
        ...req.body
    };
    res.json(priorities[req.params.id]);
});

// Delete a specific priority
router.delete('/:id', (req, res) => {
    const priority = priorites[req.params.id];
    if (!priority) {
        return res.status(404).send({
            error: "Priority not found"
        });
    }
    delete priorites[req.params.id];
    res.status(204).end();
});

module.exports = router;