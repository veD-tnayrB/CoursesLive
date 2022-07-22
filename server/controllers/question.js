import jwt from 'jsonwebtoken';
import Episode from '../models/episode.js';
import Question from '../models/question.js';

/*
    question
    options
*/

const create = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { episodeId, testId } = req.params;

    try {
        const creator = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the question creator is the episode creator
        const episode = await Episode.findById(episodeId);
        const userIsntAuthorized = episode.creator !== creator.id;

        if (userIsntAuthorized) {
            throw Error('user not authorized');
        }

        

    } catch (error) {
        next(error);
    }
}