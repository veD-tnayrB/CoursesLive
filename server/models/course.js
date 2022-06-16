import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const courseSchema = new Schema({
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
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    subscribers: {
        type: [Schema.Types.ObjectId]
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