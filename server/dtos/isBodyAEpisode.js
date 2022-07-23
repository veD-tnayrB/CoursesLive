// Validators
const titlePattern = /./;
const descriptionPattern = /./;
const videoPattern = /(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;

const isBodyAEpisode = (req, res, next) => {
    try {
        const { title, description, video } = req.body;

        // It first checks if the property exists and then checks if it is correct based on its pattern.
        const validators = {
            isTitleIncorrect: !titlePattern.test(title),
            isDescriptionIncorrect: !descriptionPattern.test(description),
            isVideoIncorrect: !videoPattern.test(video)
        }

        // Check if theres some validator wrong
        const thereSomethingWrong = Object.values(validators).some(validator => validator);

        if (thereSomethingWrong) {
            throw Error('info doesnt meet the requirements');

        }

        next();

    } catch (error) {
        next(error);

    }
}

export default isBodyAEpisode;