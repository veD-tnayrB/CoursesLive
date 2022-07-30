import Episode from '../models/episode.js';
import Question from '../models/question.js';
import User from '../models/user.js';

// Create question
const create = async (req, res, next) => {
    const { episodeId, testId } = req.params;
    const questionInfo = req.body;

    try {
        const creator = req.user;

        // Check if the episode exist and then if the question creator is the episode creator
        const episode = await Episode.findById(episodeId);
        const episodeDoesntExist = !user;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        const userIsntAuthorized = episode.creator !== creator.id;

        if (userIsntAuthorized) {
            throw Error('user not authorized');
        }

        const newQuestionInfo = {
            question: questionInfo.question,
            options: questionInfo.options
        }

        // Create the episode
        const newQuestion = await Episode.create(newQuestionInfo);
        newQuestion.save();

        // Update the test
        const updatedTest = await Test.findById(testId, { $push: { questions: newQuestion._id } })

        return res.status(202).json(updatedTest);

    } catch (error) {
        next(error);
    }
}

// Remove Question
const remove = (req, res, next) => {
    const { episodeId, testId, questionId } = req.params;

    try {
        const remover = req.user;

        // Check if the user is the creator
        const episode = await Episode.findById(episodeId);
        const episodeDoesntExist = !episode;

        if (episodeDoesntExist) {
            throw Error('user doesnt exist');
        }

        // Check if the user is the question creator
        const isntUserCreator = String(episode.creator) !== remover.id;

        if (isntUserCreator) {
            throw Error('user is not creator');
        }

        // Remove the question
        const removedQuestion = await Question.findByIdAndRemove(questionId);
        const questionDoesntExist = !removedQuestion;

        if (questionDoesntExist) {
            throw Error('question doesnt exist');
        }

        // Update the test
        const updatedTest = await Test.findByIdAndUpdate(testId, { $pull: { questions: questionId } }, { new: true });

        return res.status(200).json(updatedTest);

    } catch (error) {
        next(error);
    }
}

export { create, remove };