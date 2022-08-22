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

// Create a test
const create = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { episodeId } = req.params;
    const testInformation = req.body;

    try {
        const creator = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the episode exist
        const episode = await Episode.findById(episodeId);
        const episodeDoesntExist = !episode;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        // Check if the creator is actually the creator
        const creatorIsntAuthorized = episode.creator.toString() !== creator.id;

        if (creatorIsntAuthorized) {
            throw Error('user not authorized');
        }

        // Create the test
        const newTest = {
            title: testInformation.title,
            level: testInformation.level,
            episode: episodeId,
            questions: []
        }

        const test = await Test.create(newTest);
        test.save();

        // Add the test to the episode
        await Episode.findByIdAndUpdate(episodeId, { test: test._id });

        return res.status(202).json(test);

    } catch( error) {
        next(error);
    }
}

// Edit a test
const edit = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { episodeId, testId } = req.params;
    const testInformation = req.body;

    try {
        const editor = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the episode exist
        const episode = await Episode.findById(episodeId);
        const episodeDoesntExist = !episode;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        // Check if the editor is the creator
        const userIsntCreator = episode.creator !== editor.id;

        if (userIsntCreator) {
            throw Error('user not authorized');
        }

        // Check if the test exist
        const test = await Test.findById(testId);
        const testDoesntExist = !test;

        if (testDoesntExist) {
            throw Error('test doesnt exist');
        }

        // Update the info
        const newTestInformation = {
            title: testInformation.title,
            level: testInformation.level
        }

        const editedTest = await Test.findbyIdAndUpdate(testId, newTestInformation, { new: true });

        return res.status(200).json(editedTest);
        
    } catch (error) {
        next(error);
    }
}

// Remove a test
const remove = async () => {
    const { testId } = req.params;

    try {
        const remover = req.user;
        
        // Check if the test exist
        const test = await Test.findById(testId);
        const testDoesntExist = !test;
        
        if (testDoesntExist) {
            throw Error('test doesnt exist');
        }
        
        // Check if the remover is the creator or at least admin
        const removerIsntCreator = remover.id !== test.creator;
        const removerIsntAdmin = remover.role !== 'admin';
        
        if (removerIsntCreator || removerIsntAdmin) {
            throw Error('unauthorized');
        }
        
        // Remove the test
        await Test.findByIdAndRemove(testId);

        // Remove every test question
        await Question.deleteMany({ $in: [ test.questions ] });
        
        return res.status(200).json({ removedTest: test });
    } catch (error) {
        next(error);
    }
}

export { getATest, create, edit, remove };
