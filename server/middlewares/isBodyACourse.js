// Validators
const namePattern = /\w/;
const descriptionPattern = /\w/;
const levelPattern = /^[A-Z]+[a-z]+/;

const isBodyACourse = (req, res, next) => {
    const { name, description, level, tags } = req.body;

    const validators = {
        isNameCorrect: name && !namePattern.test(name),
        isDescriptionCorrect: description && !descriptionPattern.test(description),
        isLevelCorrect: level && !levelPattern.test(level)
    }

    try {
        const thereSomethingWrong = Object.values(validators).some(validator => validator === false);

        if (thereSomethingWrong) {
            throw Error('info doesnt meet the requirements');
        }

        next();

    } catch (error) {
        next(error);
    }
}