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

// Get one episode
const getEpisode = async (req, res, next) => {
    const { courseId, episodeId } = req.params;

    try {
        const episode = await Episode.findOne({ _id: episodeId, course: courseId });
        const episodeDoesntExist = !episode;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        return res.status(200).json(episode);

    } catch (error) {
        next(error);
    }
}

// Create a episode
const create = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const newEpisodeInfo = req.body;
    const { courseId } = req.params;

    try {
        const creator = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the user is authorized
        const user = await User.findOne({ _id: creator.id, role: creator.role });
        const userIsntAuthorized = !user;

        if (userIsntAuthorized) {
            throw Error('user not authorized');
        }

        // Check if the episode already exist
        const episodeAlreadyExist = await Episode.findOne({ course: courseId, $and: [ { $or: [{ title: newEpisodeInfo.title }, { video: newEpisodeInfo.video }] } ] });

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

        // Create the episode and save it
        const episode = await Episode.create(newEpisode);
        const episodeWasntCreated = !episode;

        if (episodeWasntCreated) {
            throw Error('episode wasnt created');
        }

        episode.save();

        // Update the course information
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { $push: { episodes: episode.id } }, { new: true });
        const courseWasntUpdated = !updatedCourse;

        if (courseWasntUpdated) {
            throw Error('course wasnt updated');
        }

        return res.status(201).json(updatedCourse);

    } catch (error) {
        next(error);
    }
}

// Edit a episode
const edit = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { courseId, episodeId } = req.params;
    const modifiedEpisodeInfo = req.body;

    try {
        const editor = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the editor exist and if is authorized
        const user = await User.findOne({ _id: editor.id, role: editor.role });
        const userIsntAuthorized = !user;

        if (userIsntAuthorized) {
            throw Error('user not authorized');
        }

        // Check if the user is creator otherwise check if is admin
        const episode = await Episode.findOne({ _id: episodeId, course: courseId, creator: editor.id });
        const userIsntCreator = !episode;
        const userIsntAdmin = editor.role !== 'admin';

        if (userIsntCreator || userIsntAdmin) {
            throw Error('user not authorized');
        }

        // Check if the course exist
        const course = await Course.findById(courseId);
        const courseDoesntExist = !course;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }

        // Check if the modified episode already exist
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

        return res.status(202).json(modifiedEpisode);

    } catch (error) {
        next(error);
    }
}

// Remove a episode
const remove = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { courseId, episodeId } = req.params;

    try {
        const remover = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the episode exist
        const episodeToRemove = await Episode.findById(episodeId);
        const episodeDoesntExist = !episodeExistToRemove;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        // Check if the user remover is actually authorized
        const user = await User.findOne({ _id: remover.id, role: remover.role });
        const userIsntAuthorized = !user;
        const userIsntOwner = String(episodeToRemove.creator) !== remover.id;

        if (userIsntAuthorized || userIsntOwner) {
            throw Error('user not authorized');
        }

        // Remove the episode
        const episode = await Episode.findByIdAndRemove(episodeId);
        const episodeWasntRemoved = !episode;

        if (episodeWasntRemoved)  {
            throw Error('episode wasnt removed');
        }

        // Update the course information
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { $pull: { episodes: episodeId } }, { new: true });
        
        return res.status(202).json(updatedCourse);
    } catch (error) {
        next(error);
    }
}

// Like a episode
const like = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { courseId, episodeId } = req.params;

    try {
        const liker = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the liker exist
        const user = await User.findOne({ _id: liker.id, role: liker.role });
        const userDoesntExist = !user;

        if (userDoesntExist) {
            throw Error('user doesnt exist');
        }

        // Check if the course exist
        const course = await Course.findById(courseId);
        const courseDoesntExist = !course;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }

        // Check if the episode exists and if it's part of the course
        const episode = await Episode.findOne({ _id: episodeId, course: courseId });
        const episodeDoesntExist = !episode;

        if (episodeDoesntExist) {
            throw Error('episode doesnt exist');
        }

        // Update the people who liked it array
        const updatedEpisode = await Episode.findByIdAndUpdate(episodeId, { $push: { people_who_liked_it: liker.id } }, { new: true });
        const episodeWasntUpdated = !updatedEpisode;

        if (episodeWasntUpdated) {
            throw Error('episode wasnt updated');
        }

        return res.status(200).json(updatedEpisode);

    } catch (error) {
        next(error);
    }
}


export { getAll, getEpisode, create, edit, like, remove };