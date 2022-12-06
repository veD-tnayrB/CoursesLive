import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
	content: {
		type: String,
		required: true,
	},

	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	episode: {
		type: Schema.Types.ObjectId,
		ref: 'Episode',
	},

	edited: {
		type: Boolean,
		required: true,
	},

	date: {
		type: Schema.Types.Date,
		required: true,
	},

	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},
});

commentSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Comment = model('Comment', commentSchema);

export default Comment;
