import Result from '../models/result.js';

class ResultController {
	async save(req, res, next) {
		try {
			const { options } = req.body;
			const { testId } = req.params;
			const user = req.user;

			const result = await Result.findOne({ test: testId, user: user.id });
			if (result) return res.status(403).json('TEST_WAS_RESOLVED');

			const today = new Date();

			const results = await Result.create({
				test: testId,
				user: user.id,
				selected_options: options,
				solved_on: today.toISOString(),
			});

			return res.status(200).json(results);
		} catch (error) {
			next(error);
		}
	}
}

const result = new ResultController();
export default result;
