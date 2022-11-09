import Course from '../models/course.js';
import Episode from '../models/episode.js';
import { unlink } from 'fs';

const VIDEOS_LOCATION = 'storage/videos';

class Episodes {
    async getAll(req, res, next) {
        try {
            const { courseId } = req.params;

            // Check if the course exist
            const course = await Course.findById(courseId);
            const courseDoesntExist = !course;

            if (courseDoesntExist) return res.status(404).json('COURSE_DOESNT_EXISTS');

            // Search the episode and check if they exists
            const episodes = await Episode.findById(courseId);

            if (!episodes) return res.status(404).json('COURSE_HASNT_EPISODES');

            return res.status(200).json(episodes);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { courseId, episodeId } = req.params;

            // Check if the course exist
            const course = await Course.findById(courseId);
            if (!course) return res.status(404).json('COURSE_DOESNT_EXISTS');

            // Search the episodes and check if the course and the episode exist
            const episode = await Episode.findOne({ id: episodeId, course: courseId });
            console.log(0, episode.comments);
            if (!episode) return res.status(404).json('EPISODE_DOESNT_EXISTS');

            return res.status(200).json(episode);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        const video = req.file.filename;
        try {
            const newEpisodeInfo = req.body;
            const { courseId } = req.params;
            const creator = req.user;

            // Check if the episode already exist
            const episodeAlreadyExist = await Episode.findOne({
                course: courseId,
                $and: [{ $or: [{ title: newEpisodeInfo.title }, { video: newEpisodeInfo.video }] }],
            });

            if (episodeAlreadyExist) return res.status(409).json('EPISODE_ALREADY_EXISTS');

            // Create the episode and save it
            const episode = await Episode.create({
                title: newEpisodeInfo.title,
                description: newEpisodeInfo.description,
                video,
                creator: creator.id,
                course: courseId,
                people_who_liked_it: [],
                comments: [],
            });
            episode.save();

            // Update the course information
            await Course.findByIdAndUpdate(courseId, { $push: { episodes: episode.id } }, { new: true });
            return res.status(201).json(episode);
        } catch (error) {
            unlink(`${VIDEOS_LOCATION}/${video}`, (err) => next(err));
            next(error);
        }
    }

    async edit(req, res, next) {
        try {
            const { courseId, episodeId } = req.params;
            const modifiedEpisodeInfo = req.body;
            const editor = req.user;

            // Check if the user is creator otherwise check if is admin
            const episode = await Episode.findOne({ _id: episodeId, course: courseId, creator: editor.id });
            const userIsntAdmin = editor.role !== 'admin';

            if (!episode || userIsntAdmin) return res.status(401).json('USER_NOT_AUTHORIZED');

            // Check if the course exist
            const course = await Course.findById(courseId);
            const courseDoesntExist = !course;

            if (courseDoesntExist) return res.status(404).json('COURSE_DOESNT_EXISTS');

            // Check if the modified episode already exist
            const episodeAlreadyExist = await Episode.findOne({
                course: courseId,
                $and: [{ $or: [{ title: modifiedEpisodeInfo.title }, { video: modifiedEpisodeInfo.video }] }],
            });

            if (episodeAlreadyExist) return res.status(409).json('EPISODE_ALREADY_EXISTS');

            // Modify the episode and check if it was modified
            const modifiedEpisode = await Episode.findByIdAndUpdate(
                episodeId,
                {
                    title: modifiedEpisodeInfo.title,
                    description: modifiedEpisodeInfo.description,
                    video: modifiedEpisodeInfo.video,
                },
                { new: true }
            );
            if (!modifiedEpisode) return res.status(304).json('EPISODE_WASNT_MODIFIED');

            return res.status(202).json(modifiedEpisode);
        } catch (error) {
            next(error);
        }
    }

    async remove(req, res, next) {
        try {
            const { courseId, episodeId } = req.params;
            const remover = req.user;

            // Check if the episode exist
            const episodeToRemove = await Episode.findById(episodeId);

            if (!episodeToRemove) return res.status(404).json('EPISODE_DOESNT_EXISTS');

            // Check if the user remover info is actually correct and if it owner
            const userIsntOwner = String(episodeToRemove.creator) !== remover.id;

            if (userIsntOwner) return res.status(304).json('USER_NOT_AUTHORIZED');

            // Remove the episode
            const episode = await Episode.findByIdAndRemove(episodeId);

            // Update the course information
            const updatedCourse = await Course.findByIdAndUpdate(
                courseId,
                { $pull: { episodes: episodeId } },
                { new: true }
            );

            return res.status(202).json(updatedCourse);
        } catch (error) {
            next(error);
        }
    }

    async like(req, res, next) {
        try {
            const { courseId, episodeId } = req.params;
            const liker = req.user;

            // Check if the course exist
            const course = await Course.findById(courseId).populate('episodes');
            if (!course) return res.status(404).json({ message: 'COURSE_DOESNT_EXISTS' });

            // Check if the episode exists and if it's part of the course
            const episode = course.episodes.find((episode) => String(episode.id) === episodeId);
            if (!episode) return res.status(404).json({ message: 'EPISODE_DOESNT_EXISTS' });

            const isLikedIt = episode.people_who_liked_it.some((person) => String(person) === liker.id);
            if (isLikedIt) return res.status(304).json({ message: 'UNAUTHORIZED' });
            // Update the people who liked it array
            const updatedEpisode = await Episode.findByIdAndUpdate(
                episodeId,
                { $push: { people_who_liked_it: liker.id } },
                { new: true }
            );

            return res.status(200).json(updatedEpisode);
        } catch (error) {
            next(error);
        }
    }

    async unlike(req, res, next) {
        try {
            const { courseId, episodeId } = req.params;
            const unliker = req.user;

            // Check if the course exist
            const course = await Course.findById(courseId).populate('episodes');
            if (!course) return res.status(404).json('COURSE_DOESNT_EXISTS');

            // Check if the episode exists and if it's part of the course
            const episode = course.episodes.find((episode) => String(episode.id) === episodeId);
            if (!episode) return res.status(404).json({ message: 'EPISODE_DOESNT_EXISTS' });

            const isLikedIt = episode.people_who_liked_it.some((person) => String(person) === unliker.id);
            if (!isLikedIt) return res.status(304).json({ message: 'UNAUTHORIZED' });

            // Update the people who liked it array
            const updatedEpisode = await Episode.findByIdAndUpdate(
                episodeId,
                { $pull: { people_who_liked_it: unliker.id } },
                { new: true }
            );

            return res.status(200).json(updatedEpisode);
        } catch (error) {
            next(error);
        }
    }
}

const episodes = new Episodes();
export default episodes;
