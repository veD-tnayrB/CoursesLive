import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const episodeSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    video: {
        type: String,
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    course: {
        ref: 'Course',
        type: Schema.Types.ObjectId,
        required: true
    },

    people_who_liked_it: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },

    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        required: false
    },

    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment',
        required: false
    }
})

episodeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        returnedObject.peopleWhoLikedIt = returnedObject.people_who_liked_it;

        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.people_who_liked_it;
    }
})

const Episode = model('Episode', episodeSchema);

export default Episode;