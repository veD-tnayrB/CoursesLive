// Validators
const titlePattern = /^[A-Z]{1,1}[a-z]+$/;

const isBodyACourse = (req, res, next) => {
    try {
        const { content } = req.body;

        // Check if the property exist, then check if their valur is incorrect or doesnt meet the requirements
        const validators = {
            isContentIncorrect: !description
        }

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





















