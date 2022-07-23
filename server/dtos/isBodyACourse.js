// Validators
const namePattern = /./;
const descriptionPattern = /./;
const levelPattern = /^[A-Z]+[a-z]+/;

const isBodyACourse = (req, res, next) => {
    try {
        const { name, description, level, tags } = req.body;

        // Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
        const validators = {
            isNameIncorrect: !namePattern.test(name),
            isDescriptionIncorrect: !descriptionPattern.test(description),
            isLevelIncorrect: !levelPattern.test(level),
            isTagIncorrect: tags && tags.length < 2
        }
    
        // Check if some validator is incorrect
        const thereSomethingWrong = Object.values(validators).some(validator => validator);

        if (thereSomethingWrong) {
            throw Error('info doesnt meet the requirements');
        }

        next();

    } catch (error) {
        next(error);
    }
}

export default isBodyACourse;