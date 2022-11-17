// Validators
const titlePattern = /\w/;

const isBodyATest = (req, res, next) => {
	try {
		const { title, questions } = req.body;

		// Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
		const validators = {
			isTitleIncorrect: !titlePattern.test(title),
			areQuestionsIncorrect: questions.length < 1,
		};

		// Check if theres some validator incorrect
		const thereSomethingWrong = Object.values(validators).some((validator) => validator);

		if (thereSomethingWrong) {
			throw Error('info doesnt meet the requirements');
		}

		next();
	} catch (error) {
		next(error);
	}
};

export default isBodyATest;
