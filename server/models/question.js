import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const questionSchema = new Schema({
	title: {
		type: String,
		required: true,
	},

	options: {
		type: [{ id: String, value: String }],
		required: true,
	},

	correct_option: {
		type: { id: String, value: String },
		required: true,
	},
});

questionSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		returnedObject.correctOption = returnedObject.correct_option;

		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.correct_option;
	},
});

const Question = model('Question', questionSchema);
export default Question;
