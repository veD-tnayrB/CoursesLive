import jwt from 'jsonwebtoken';
import Episode from '../models/episode.js';
import Question from '../models/question.js';
import User from '../models/user.js';

// Create question
const create = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { episodeId, testId } = req.params;
    const questionInfo = req.body;

    try {
        const creator = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the question creator is the episode creator
        const episode = await Episode.findById(episodeId);
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
    const { authorization: token } = req.headers;
    const { testId, questionId } = req.params;

    try {
        const remover = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is already correct
        const user = await User.findById(remover.id);
        const userDoesntExist = !user;

        if (userDoesntExist) {
            throw Error('user doesnt exist');
        }

        // Remove the question
        const removedQuestion = await Question.findByIdAndRemove(questionId);
        const questionDoesntExist = !removedQuestion;

        if (questionDoesntExist) {
            throw Error('question doesnt exist');
        }

        // Update the test
        const updatedTest = await Test.findByIdAndUpdate(testId, { $pull: { questions: questionId } });

        return res.status(200).json(updatedTest);

    } catch (error) {
        next(error);
    }
}

export { create, remove };