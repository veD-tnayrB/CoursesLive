import Comment from '../models/comment.js';
import Episode from '../models/episode.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

class Comments {
	async getAll(req, res, next) {
		const episodeId = req.params.episodeId;

		try {
			// Check if the episode exist
			const episode = await Episode.findById(episodeId);
			const episodeDoesntExist = !episode;

			if (episodeDoesntExist) {
				throw Error('episode doesnt exist');
			}

			// Get all the comments and the answers
			const comments = await Comment.find({ episode: episodeId })
				.populate('creator', { mail: 0 })
				.sort({ date: 'desc' });
			return res.status(200).json(comments);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		const { episodeId } = req.params;
		const commentInfo = req.body;

		try {
			const creator = req.user;

			// Check if the episode exist
			const episode = await Episode.findById(episodeId);
			const episodeDoesntExist = !episode;

			if (episodeDoesntExist) {
				throw Error('episode doesnt exist');
			}

			const today = new Date();

			const newComment = {
				content: commentInfo.content,
				creator: creator.id,
				episode: episodeId,
				date: today.toISOString(),
				edited: false,
			};

			// Create the comment
			const comment = await Comment.create(newComment);
			comment.save();

			// Update the episode comments
			await Episode.findByIdAndUpdate(episodeId, { $push: { comments: comment } }, { new: true });

			return res.status(202).json(comment);
		} catch (error) {
			next(error);
		}
	}

	async remove(req, res, next) {
		const { authorization: token } = req.headers;
		const { episodeId, commentId } = req.params;

		try {
			// Check if the comment exist
			const comment = await Comment.findById(commentId);
			const commentDoesntExist = !comment;

			if (commentDoesntExist) {
				throw Error('comment doesnt exist');
			}

			const commentator = jwt.verify(token, process.env.JWT_SECRET);

			// Check if the user exist and if its authorized
			const user = await User.findOne({ _id: commentator.id, role: commentator.role });
			const userDoesntExist = !user;

			if (userDoesntExist) {
				throw Error('user doesnt exist');
			}

			const userIsntCreator = String(comment.creator) !== commentator.id;
			// const userIsntAdmin = commentator.role === 'admin';

			if (userIsntCreator /*|| userIsntAdmin*/) {
				throw Error('user not authorized');
			}

			// Delete the comment and update the episode info
			const deletedComment = await Comment.findByIdAndRemove(commentId);

			await Episode.findByIdAndUpdate(episodeId, { $pull: { comments: commentId } }, { new: true });

			return res.status(200).json(deletedComment);
		} catch (error) {
			next(error);
		}
	}

	async edit(req, res, next) {
		const { authorization: token } = req.headers;
		const { commentId } = req.params;
		const newComment = req.body;

		try {
			// Check if the comment exist
			const comment = await Comment.findById(commentId);
			const commentDoesntExist = !comment;

			if (commentDoesntExist) {
				throw Error('comment doesnt exist');
			}

			// Check if the editor exist and if its the creator
			const editor = jwt.verify(token, process.env.JWT_SECRET);

			const user = await User.findOne({ _id: editor.id, role: editor.role });
			const userDoesntExist = !user;

			if (userDoesntExist) {
				throw Error('user doesnt exist');
			}

			const isntEditorTheCreator = String(comment.creator) !== editor.id;

			if (isntEditorTheCreator) {
				throw Error('user not authorized');
			}

			// Update the comment
			const newCommentInfo = {
				content: newComment.content,
				edited: true,
			};

			const modifiedComment = await Comment.findByIdAndUpdate(commentId, newCommentInfo, { new: true });

			return res.status(200).json(modifiedComment);
		} catch (error) {
			next(error);
		}
	}
}

const comments = new Comments();
export default comments;
