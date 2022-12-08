import fs from 'fs';
import User from '../models/user.js';
import Course from '../models/course.js';
import Episode from '../models/episode.js';
import { BASE_MEDIA_PATH } from './media.controller.js';
import Test from '../models/test.js';
import Question from '../models/question.js';
import Comment from '../models/comment.js';

class Courses {
	async getAll(req, res, next) {
		try {
			const theresQueries = req.query.search !== '' || req.query.level !== '';
			if (theresQueries) {
				const { level, search: courseName } = req.query;
				const courses = await Course.find(
					{
						level: { $regex: level },
						'episodes.1': { $exists: true },
						name: { $regex: courseName },
					},
					'-tags'
				).populate('creator', {
					courses: 0,
					mail: 0,
					name: 0,
					lastName: 0,
					role: 0,
				});

				return res.status(200).json(courses);
			}

			const courses = await Course.find({}, '-tags').populate('creator', {
				courses: 0,
				mail: 0,
				name: 0,
				lastName: 0,
				role: 0,
			});

			return res.status(200).json(courses);
		} catch (error) {
			next(error);
		}
	}

	async getById(req, res, next) {
		try {
			const courseId = req.params.courseId;

			const course = await Course.findById(courseId).populate('episodes').populate('creator');
			return res.status(200).json(course);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		const { courseFolder } = req;
		try {
			const cover = req.file.filename;
			const courseInfo = req.body;
			const creator = req.user;

			// Check if the course already exist
			const courseAlreadyExist = await Course.findOne({ name: courseInfo.name });
			if (courseAlreadyExist) return res.status(409).json('COURSE_ALREADY_EXISTS');

			const userCreator = await User.findById(creator.id);

			// Create the course
			const course = await Course.create({
				...courseInfo,
				creator: creator.id,
				suscribers: [],
				folder: courseFolder,
				cover,
			});
			course.save();
			return res.status(201).json({ ...course._doc, id: course._doc._id, creator: userCreator });
		} catch (error) {
			fs.rmdirSync(courseFolder);
			next(error);
		}
	}

	async edit(req, res, next) {
		try {
			const cover = req.file.filename;
			const editedCourse = req.body;
			const { courseId } = req.params;

			// Check if the edited course already exist
			const courseAlreadyExist = await Course.findOne({ _id: { $ne: editedCourse.id }, name: editedCourse.name });
			if (courseAlreadyExist) return res.status(409).json('COURSE_ALREADY_EXIST');

			const course = await Course.findById(editedCourse.id);

			const editor = req.user;
			const creatorId = String(course.creator);

			if (editor.id !== creatorId) return res.status(401).json('USER_NOT_AUTHORIZED');

			fs.rmSync(`${BASE_MEDIA_PATH}/${course.folder}/${course.cover}`);

			const modifiedCourse = {
				name: editedCourse.name,
				level: editedCourse.level,
				tags: editedCourse.tags,
				cover,
			};

			// Edit the course
			const updatedCourse = await Course.findByIdAndUpdate(courseId, modifiedCourse, { new: true }).populate('creator', {
				courses: 0,
				mail: 0,
				name: 0,
				lastName: 0,
				role: 0,
			});
			return res.status(200).json(updatedCourse);
		} catch (error) {
			next(error);
		}
	}

	async remove(req, res, next) {
		try {
			const courseToRemoveId = req.params.courseId;

			// Check if the course exist
			const courseToRemove = await Course.findById(courseToRemoveId);

			// Check if the creator is the remover
			const courseRemover = req.user.id;
			const creator = String(courseToRemove.creator);

			if (courseRemover !== creator) return res.status(401).json('USER_NOT_AUTHORIZED');

			// Remove the course
			await Course.findByIdAndRemove(courseToRemoveId);

			fs.rmdirSync(`${BASE_MEDIA_PATH}/${courseToRemove.folder}`, { recursive: true, force: true });

			// Unsuscribe all the users
			await User.updateMany({ courses: { $in: courseToRemoveId } }, { $pull: { courses: courseToRemoveId } });

			// Delete all episodes
			await Episode.deleteMany({ course: courseToRemoveId });
			await Test.deleteMany({ course: courseToRemoveId });
			await Question.deleteMany({ course: courseToRemoveId });
			await Comment.deleteMany({ course: courseToRemoveId });

			return res.status(200).json({ removedCourse: courseToRemove });
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	async suscribe(req, res, next) {
		try {
			const { courseId } = req.params;
			const user = req.user;

			const courseToModify = await Course.findById(courseId);
			if (!courseToModify) return res.status(404).json('COURSE_DOESNT_EXISTS');

			// Check if the user is already suscribed
			const isUserSuscribed = courseToModify.subscribers.some((suscriber) => String(suscriber) === user.id);

			if (isUserSuscribed) return res.status(304).json('USER_ALREADY_SUSCRIBED');

			// Add the user id to the suscribers array
			const courseToSuscribe = await Course.findByIdAndUpdate(courseId, { $push: { subscribers: user.id } }, { new: true });

			// Update the user information
			const updatedUser = await User.findByIdAndUpdate(user.id, { $push: { courses: courseId } }, { new: true });
			return res.status(202).json({ user: updatedUser, course: courseToSuscribe });
		} catch (error) {
			next(error);
		}
	}

	async unsuscribe(req, res, next) {
		try {
			const { courseId } = req.params;
			const user = req.user;

			const courseToModify = await Course.findById(courseId);
			if (!courseToModify) return res.status(404).json('COURSE_DOESNT_EXISTS');

			// Check if the user is already suscribed
			const isUserSuscribed = courseToModify.subscribers.some((suscriber) => String(suscriber) === user.id);
			const isntUserSuscribed = !isUserSuscribed;

			if (isntUserSuscribed) return res.status(304).json('USER_ISNT_SUSCRIBED');

			// Remove the user id from the suscribers array
			await Course.findByIdAndUpdate(courseId, { $pull: { subscribers: user.id } });

			// Update the courses array
			const updatedUser = await User.findByIdAndUpdate(user.id, { $pull: { courses: courseId } }, { new: true });
			return res.status(202).json({ user: updatedUser });
		} catch (error) {
			next(error);
		}
	}
}

const courses = new Courses();
export default courses;
