import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    level: {
        type: String,
        required: true
    },

    tags: {
        type: [String]
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    episodes: {
        type: [Schema.Types.ObjectId],
        ref: 'Episode'
    },

    subscribers: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
})

courseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;

        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Course = model('Course', courseSchema);

export default Course;