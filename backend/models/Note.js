const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    recurrence: {
        type: String,
        enum: ['one-time', 'daily', 'weekly', 'monthly'],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);