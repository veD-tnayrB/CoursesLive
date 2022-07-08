import Comment from '../models/comment.js';

const getAll = async (req, res, next) => {
    const episodeId = req.params.episodeId;

    try {
        // Check if the episode exist
        const episode = await Episode.findById(episodeId);
        const episodeDoesntExist = !episode;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        // Get all the comments
        const comments = await Comment.find({ episode: episodeId });
        const theresNoComments = !comments;

        if (theresNoComments) {
            throw Error('theres no comments');
        }

        return res.status(200).json(comments);
    } catch (error) {
        next(error);
    }

}

const getAnswers = (req, res, next) => {
    const { episodeId, commentId } = req.params;

    try {
        // Check if the comment exist
        const comment = await Comment.findById(commentId);
        const commentDoesntExist = !comment;

        if (commentDoesntExist) {
            throw Error('comment doesnt exist');
        }

        // Get all the answers
        const answers = await Comment.find({ episode: episodeId, _id: { $in: comment.answers } });
        const theresNoAnswers = !answers;

        if (theresNoAnswers) {
            throw Error('theres no answers');
        }

        return res.status(200).json(answers);

    } catch (error) {

    }
}

export { getAll, getAnswers };