import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },

    options: {
        type: [Object], // 🤨🤨🤨
        required: true
    }
});

questionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        returnedObject.peopleWhoLikedIt = returnedObject.people_who_liked_it;

        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.people_who_liked_it;
    }
})

const Question = model('Question', questionSchema);

export default Question;