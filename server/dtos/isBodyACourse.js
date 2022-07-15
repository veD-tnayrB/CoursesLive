// Validators
const namePattern = /\w/;
const descriptionPattern = /\w/;
const levelPattern = /^[A-Z]+[a-z]+/;

const isBodyACourse = (req, res, next) => {
    try {
        const { name, description, level, tags } = req.body;

        // Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
        const validators = {
            isNameIncorrect: name && !namePattern.test(name),
            isDescriptionIncorrect: description && !descriptionPattern.test(description),
            isLevelIncorrect: level && !levelPattern.test(level),
            isTagIncorrect: !tags.isArray()
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

export { isBodyACourse }