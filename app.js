const express = require('express');
const morgan = require('morgan');

const usersRouter = require('./routes/users');
const tasksRoute = require('./routes/tasks');
const categoriesRoute = require('./routes/categories');
const prioritesRoute = require('./routes/priorites');
const assignmentsRoute = require('./routes/assignments');

const app = express();

app.use(express.json());
app.use(morgan('tiny')); // Logging

// Routes
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/priorities', prioritesRoute);
app.use('/api/assignments', assignmentsRoute);


// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!'
    });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));