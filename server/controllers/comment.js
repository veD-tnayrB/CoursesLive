import Comment from '../models/comment.js';
import Episode from '../models/episode.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Get all comments of a episode
const getAll = async (req, res, next) => {
    const episodeId = req.params.episodeId;

    try {
        // Check if the episode exist
        const episode = await Episode.findById(episodeId);
        const episodeDoesntExist = !episode;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        // Get all the comments and the answers
        const comments = await Comment.find({ episode: episodeId }).populate('answers', {

        });
        const theresNoComments = !comments;

        if (theresNoComments) {
            throw Error('theres no comments');
        }

        return res.status(200).json(comments);
    } catch (error) {
        next(error);
    }

}

// Create a comment
const create = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { episodeId } = req.params;
    const commentInfo = req.body;

    try {
        const creator = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the episode exist
        const episode = await Episode.findById(episodeId);
        const episodeDoesntExist = !episode;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        const today = new Date();

        const newComment = {
            title: commentInfo.title,
            content: commentInfo.content,
            creator: creator.id,
            episode: episodeId,
            date: today.toISOString()
        }

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

// Delete comment
const remove = async (req, res, next) => {
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

        const userIsntCreator = comment.creator !== commentator.id;
        const userIsntAdmin = commentator.role === 'admin';

        if (userIsntCreator || userIsntAdmin) {
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

// Edit a comment
const edit = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { commentId } = req.params;
    const { newComment } = req.body;

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

        const isntEditorTheCreator = comment.creator !== editor.id;

        if (isntEditorTheCreator) {
            throw Error('user not authorized');
        }

        // Update the comment
        const newCommentInfo = {
            title: newComment.title,
            content: newComment.content
        }

        const modifiedComment = await Comment.findByIdAndUpdate(commentId, newCommentInfo, { new: true }); 
        
        return res.status(200).json(modifiedComment);
    } catch (error) {
        next(error);
    }
}

export { getAll, create, edit, remove };