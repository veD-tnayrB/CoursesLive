// Validators
const titlePattern = /^[A-Z]{1,1}[a-z]+$/;
const descriptionPattern = /^[A-Z]{1,1}[a-z]+/;
const videoPattern = /^((?: https ?:) ?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

const isBodyAEpisode = (req, res, next) => {
    try {
        const { title, description, video } = req.body;

        // It first checks if the property exists and then checks if it is correct based on its pattern.
        const validators = {
            isTitleIncorrect: title && !titlePattern.test(title),
            isDescriptionIncorrect: description && !descriptionPattern.test(description),
            isVideoIncorrect: video && !videoPattern.test(video)
        }

        const thereSomethingWrong = Object.values(validators).some(validator => validator);

        if (thereSomethingWrong) {
            throw Error('info doesnt meet the requirements');

        }

    } catch (error) {
        next(error);

    }

    next()
}

export { isBodyAEpisode };