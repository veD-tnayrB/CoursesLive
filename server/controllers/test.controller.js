import jwt from 'jsonwebtoken';
import Test from '../models/test.js';
import Episode from '../models/episode.js';
import Question from '../models/question.js';

class Tests {
	async getOne(req, res, next) {
		const { episodeId } = req.params;

		try {
			const test = await Test.findOne({ episode: episodeId }).populate('questions');
			return res.status(200).json(test);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
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
			const creatorIsntAuthorized = String(episode.creator) !== creator.id;

			if (creatorIsntAuthorized) {
				throw Error('user not authorized');
			}

			const questions = await Question.insertMany(testInformation.questions);
			const questionsId = questions.map((question) => question._id);

			const test = await Test.create({
				title: testInformation.title,
				episode: episodeId,
				questions: questionsId,
				test_takers: [],
			});
			test.save();

			// Add the test to the episode
			await Episode.findByIdAndUpdate(episodeId, { test: test._id });

			return res.status(202).json(test);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async edit(req, res, next) {
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
				level: testInformation.level,
			};

			const editedTest = await Test.findbyIdAndUpdate(testId, newTestInformation, { new: true });

			return res.status(200).json(editedTest);
		} catch (error) {
			next(error);
		}
	}

	async remove(req, res, next) {
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
			await Question.deleteMany({ $in: [test.questions] });

			return res.status(200).json({ removedTest: test });
		} catch (error) {
			next(error);
		}
	}
}

const tests = new Tests();
export default tests;
