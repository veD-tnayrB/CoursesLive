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
        const thereSomethingWrong = Object.values(validators).some(validator => validator);

        if (thereSomethingWrong) {
            throw Error('info doesnt meet the requirements');
        }

        

    } catch (error) {
        next(error);
    }

    next();
}