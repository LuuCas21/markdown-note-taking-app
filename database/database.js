const mongoose = require('mongoose');

const connectDB = async (URL) => {
    await mongoose.connect(URL);
    console.log('Connected to database');
}

module.exports = connectDB;