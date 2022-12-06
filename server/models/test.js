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
		type: [Schema.Types.ObjectId],
		ref: 'Question',
		required: true,
	},

	test_takers: {
		type: [Schema.Types.ObjectId],
		ref: 'User',
		required: true,
	},

	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},
});

testSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		returnedObject.testTakers = returnedObject.test_takers;

		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.test_takers;
	},
});

const Test = model('Test', testSchema);

export default Test;
