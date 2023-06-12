const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');

const router = express.Router();

// Store categories in memory as an object for simplicity
const categories = {};

// Validation schema for category
const categorySchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
});

// Utility to validate a category
function validateUser(category) {
    const result = categorySchema.validate(category);
    console.log(result);
    if (result.error) {
        return result.error.details[0].message;
    }
    return null;
}

// CREATE category
router.post('/', (req, res) => {
    const error = validateCategory(req.body);
    if (error) {
        return res.status(400).send({
            error: "Invalid category data",
            details: error.replace(/^\s+/, '')
        });
    } else {
        const category = {
            id: uuid(),
            ...value,
        }

        categories.push(category);
        res.status(200).json(categories);
    }
});

//READ category by id 
router.get('/:id', (req, res) => {
    const category = categories[req.params.id];
    if (!category) {
        return res.status(404).send({
            error: "Category not found"
        });
    }
    res.json(category);
});

// read all categories
router.get('/', (req, res) => {
    res.json(Object.values(categories));
});

// UPDATE category by id 
router.put('/:id', (req, res) => {
    if (error) {
        return res.status(400).send({
            error: "Invalid category data"
        });
    }
    users[req.params.id] = {
        ...category,
        ...req.body
    };
    res.json(users[req.params.id]);
});

// DELETE category
router.delete('/:id', (req, res) => {
    const category = categories[req.params.id];
    if (!category) {
        return res.status(404).send({
            error: "Category not found"
        });
    }
    delete categories[req.params.id];
    res.status(204).end();
});
module.exports = router;