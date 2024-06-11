const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
