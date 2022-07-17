// Validators
const titlePattern = /\w/;
const levelPattern = /^[A-Z]+[a-z]+/;


const isBodyATest = (req, res, next) => {
    try {
        const { title, level } = req.body;

        // Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
        const validators = {
            isTitleIncorrect: title && !titlePattern.test(title),
            isLevelIncorrect: level && !levelPattern.test(level),
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

export { isBodyATest };