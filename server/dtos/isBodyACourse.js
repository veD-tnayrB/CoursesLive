// Validators
const namePattern = /./;
const levelPattern = /^(Beginner|Mid Level|Senior)$/;

const isBodyACourse = (req, res, next) => {
	try {
		const { name, level, tags } = req.body;
		// Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
		const validators = {
			isNameIncorrect: !namePattern.test(name),
			isLevelIncorrect: !levelPattern.test(level),
			isTagIncorrect: tags && !Array.isArray(tags),
		};

		// Check if some validator is incorrect
		const thereSomethingWrong = Object.values(validators).some((validator) => validator);

		if (thereSomethingWrong) {
			throw Error('info doesnt meet the requirements');
		}

		next();
	} catch (error) {
		next(error);
	}
};

export default isBodyACourse;
