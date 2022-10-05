import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    mail: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    courses: {
        type: [Schema.Types.ObjectId],
        ref: 'Course'
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;

        delete returnedObject.password;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})


const User = model('User', userSchema);

export default User;