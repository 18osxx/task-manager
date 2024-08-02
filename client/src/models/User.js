const mongoose = require('mongoose'); // Import mongoose

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    }); 

const User = mongoose.model('User', UserSchema); // Create a model User from the schema