import Comment from '../models/comment.js';

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
        /*
            title: 
            content: 
            creator: 
            answers: 
            episode: 
            date: 
        */
        const newComment = {
            title: commentInfo.title,
            content: commentInfo.content,
            creator: creator.id,
            answers: [],
            episode: episodeId,
            date: new Date().now()
        }

        // Create the episode
        const comment = await Comment.create(newComment);

        return res.status(202).json(comment);

    } catch (error) {
        next(error);
    }
}

export { getAll, create };