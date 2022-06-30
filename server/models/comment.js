import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    answers: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;

        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Comment = model('Comment', commentSchema);

export default Comment;