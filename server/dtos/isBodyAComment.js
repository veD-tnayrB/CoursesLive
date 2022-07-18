// Validators
const titlePattern = /^[A-Z]{1,1}[a-z]+$/;
const descriptionPattern = /\w/;

const isBodyACourse = (req, res, next) => {
    try {
        const { title, description } = req.body;

        // Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
        const validators = {
            isTitleIncorrect: title && !titlePattern.test(title),
            isDescriptionIncorrect: description && !descriptionPattern.test(description)
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




















