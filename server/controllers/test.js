import jwt from 'jsonwebtoken';
import Test from '../models/test.js';
import Episode from '../models/episode.js';

// Get a test
const getATest = async (req, res, next) => {
    const { episodeId } = req.params;

    try {
        const test = await Test.findOne({ episode: episodeId }).populate('questions')
        const testDoenstExist = !test;

        if (testDoenstExist) {
            throw Error('test doesnt exist');
        }

        return res.status(200).json(test);
    } catch (error) {
        next(error);
    }
}

// Add a test

// Edit a test

// Remove a test

export { getATest };