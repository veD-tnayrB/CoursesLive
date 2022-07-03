import jwt from 'jsonwebtoken';
import Course from '../models/course.js';
import Episode from '../models/episode.js';
import User from '../models/user.js';

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
        const courseHasntEpisodes = !episodes
        
        if (courseHasntEpisodes) {
            throw Error('course hasnt episodes');
        }

        return res.status(200).json(episodes);

    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { courseId } = req.params;

    try {
        const creator = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the user is authorized
        const user = await User.findOne({ id: creator.id, role: creator.role });
        const userIsntAuthorized = !user;

        if (userIsntAuthorized) {
            throw Error('user not authorized');
        }

        // Check if the episode already exist
        const episodeAlreadyExist = await Episode.findOne({ course: courseId, $or: [{ title: newEpisodeInfo.title }, { video: newEpisodeInfo.video }] });

        if (episodeAlreadyExist) {
            throw Error('episode already exist');
        }

        const newEpisode = {
            title: newEpisodeInfo.title,
            description: newEpisodeInfo.description,
            video: newEpisodeInfo.video,
            creator: creator.id,
            course: courseId,
            people_who_liked_it: [],
            comments: []
        }

        // Create the episode
        const episode = await Episode.create(newEpisode);
        const episodeWasntCreated = !episode;

        if (episodeWasntCreated) {
            throw Error('episode wasnt created');
        }

        episode.save();
        return res.status(201).json(episode);

    } catch (error) {
        next(error);
    }
}

// Edit the episode
const edit = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { courseId, episodeId } = req.params;
    const modifiedEpisodeInfo = req.body;

    try {
        const editor = jwt.verify(token, process.env.JWT);

        // Check if the editor exist and if is authorized
        const user = await User.findOne({ id: editor.id, role: editor.role });
        const userIsntAuthorized = !user;

        if (userIsntAuthorized) {
            throw Error('user not authorized');
        }

        // Check if the user is creator otherwise check if is admin
        const episode = await Episode.findOne({ id: episodeId, course: courseId, creator: editor.id });
        const userIsntCreator = !episode;
        const userIsntAdmin = editor.role !== 'admin';

        if (userIsntCreator || userIsntAdmin) {
            throw Error('user not authorized');
        }

        // Check if the episode already exist
        const episodeAlreadyExist = await Episode.findOne({ course: courseId, $or: [{ title: modifiedEpisodeInfo.title }, { video: modifiedEpisodeInfo.video }] });

        if (episodeAlreadyExist) {
            throw Error('episode already exist');
        }

        // Modify the episode
        const newEpisodeInfo = {
            title: modifiedEpisodeInfo.title,
            description: modifiedEpisodeInfo.description,
            video: modifiedEpisodeInfo.video,
        }

        const modifiedEpisode = await Episode.findByIdAndUpdate(episodeId, newEpisodeInfo, { new: true });
        const episodeWasntModified = !modifiedEpisode;

        if (episodeWasntModified) {
            throw Error('episode wasnt modified');
        }

        return res.status(202).json(newEpisode);

    } catch (error) {
        next(error);
    }
}



export { getAll, create, edit };