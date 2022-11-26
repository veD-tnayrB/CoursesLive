import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const resultSchema = new Schema({
	test: {
		type: Schema.Types.ObjectId,
		ref: 'Test',
		required: true,
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	selected_options: {
		type: [{ id: String }],
		required: true,
	},

	solved_on: {
		type: Schema.Types.Date,
		required: true,
	},
});

resultSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		returnedObject.selectedOptions = returnedObject.selected_options;
		returnedObject.solvedOn = returnedObject.solved_on;

		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.solved_on;
		delete returnedObject.selected_options;
	},
});

const Result = model('Result', resultSchema);
export default Result;
