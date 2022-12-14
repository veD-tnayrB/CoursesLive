// Validators
const namePattern = /^[A-Z]{1,1}[a-z]+$/;
const lastNamePattern = /^[A-Z]{1,1}[a-z]+$/;
const mailPattern = /^[a-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern = /[\w]{8,16}/;

const isBodyAUser = (req, res, next) => {
	try {
		const { name, lastName, mail, password } = req.body;

		console.log(0, req.body);
		console.log(1, name, lastName, mail, password);

		// It first checks if the property exists and then checks if it is correct based on its pattern.
		const validators = {
			isNameIncorrect: !namePattern.test(name),
			isLastNameIncorrect: !lastNamePattern.test(lastName),
			isMailIncorrect: !mailPattern.test(mail),
			isPasswordIncorrect: !passwordPattern.test(password),
		};

		const thereSomethingWrong = Object.values(validators).some((validator) => validator);

		if (thereSomethingWrong) {
			throw Error('info doesnt meet the requirements');
		}

		next();
	} catch (error) {
		next(error);
	}
};

export default isBodyAUser;
