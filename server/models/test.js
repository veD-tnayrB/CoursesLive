import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const testSchema = new Schema({
	title: {
		type: String,
		required: true,
	},

	episode: {
		type: Schema.Types.ObjectId,
		ref: 'Episode',
		required: true,
	},

	questions: {
		type: [{ title: String, options: [{ id: String, value: String, isCorrect: Boolean }] }],
		required: true,
	},
});

testSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Test = model('Test', testSchema);

export default Test;
