import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const testSchema = new Schema({
    title: {
        type: string,
        required: true
    },

    level: {
        type: Number,
        required: true
    },

    episode: {
        type: Schema.Types.ObjectId,
        ref: 'Episode',
        required: true
    },

    questions: {
        type: [Schema.Types.ObjectId],
        ref: 'AQUI VAN LAS PREGUNTAS',
        required: true
    }
});

testSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;

        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Test = model('Test', testSchema);

export default Test;