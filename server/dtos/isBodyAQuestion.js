// Validators
const questionPattern = /\w/;

const isBodyAQuestion = (req, res, next) => {
    try {
        const { question, options } = req.body;

        // Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
        const validators = {
            isQuestionIncorrect: question && !questionPattern.test(question),
            areOptionsIncorrect: options.length < 2,
            theresntSomeTrueOption: options.every(option => option.isCorrect === false)
        }

        const thereSomethingWrong = Object.values(validators).some(validator => validator);

        if (thereSomethingWrong) {
            throw Error('info doesnt meet the requirements');
        }

    } catch (error) {
        next(error);
    }

    next();
}

export { isBodyAQuestion };