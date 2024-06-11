const express = require('express');
const router = express.Router();
const Issue = require('../models/issues');

// Create an issue
router.post('/', async (req, res) => {
    const { title, description, date, status, priority } = req.body;

    if (!title || !description || !date || !status || !priority) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newIssue = new Issue({ title, description, date, status, priority });
        const savedIssue = await newIssue.save();
        res.status(201).json(savedIssue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an issue
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, date, status, priority } = req.body;

    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            id,
            { title, description, date, status, priority },
            { new: true }
        );

        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.json(updatedIssue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a specific issue
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedIssue = await Issue.findByIdAndDelete(id);

        if (!deletedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete all issues
router.delete('/', async (req, res) => {
    try {
        await Issue.deleteMany({});
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch a specific issue
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        res.json(issue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch all issues with optional filters
router.get('/', async (req, res) => {
    const { priority, date, status } = req.query;
    let filter = {};

    if (priority) {
        filter.priority = priority;
    }

    if (date) {
        filter.date = new Date(date);
    }

    if (status) {
        filter.status = status;
    }

    try {
        const issues = await Issue.find(filter);
        res.json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
