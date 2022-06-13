import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const courseSchema = new Shchema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    level: {
        type: String,
        required: true
    },

    tags: {
        type: [String],
        required: true
    }
})