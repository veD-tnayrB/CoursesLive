import Course from '../models/course.js';
import Episode from '../models/episode.js';

// Gets the episodes of a course
const getAll = async (req, res, next) => {
    const { courseId } = req.params;

    try {
        // Check if the course exist
        const course = await Course.findById(courseId);
        const courseDoesntExist  = !course;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }

        const episodes = await Episode.find({ course: courseId });
        const courseHasntEpisodes = !epsiodes
        
        if (courseHasntEpisodes) {
            throw Error('course hasnt episodes');
        }

        return res.status(200).json(episodes);

    } catch (error) {
        next(error);
    }
}


export { getAll }