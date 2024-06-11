const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const issuesRoutes = require('./routes/issues');
require('dotenv').config();

const app = express();
const PORT = 3000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/issues', issuesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
