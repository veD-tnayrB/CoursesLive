// Validators
const titlePattern = /\w/;
const levelPattern = /^[A-Z]+[a-z]+/;

const isBodyATest = (req, res, next) => {
	try {
		const { title, level, questions } = req.body;

		// Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
		const validators = {
			isTitleIncorrect: !titlePattern.test(title),
			isLevelIncorrect: !levelPattern.test(level),
			areQuestionsIncorrect: questions.length < 2,
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
