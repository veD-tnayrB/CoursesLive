import User from '../models/user.js';
import Course from '../models/course.js';
import Episode from '../models/episode.js';

class Courses {
	async getAll(req, res, next) {
		try {
			const theresQueries = req.query;

			if (theresQueries) {
				const { level, search: courseName } = req.query;
				const courses = await Course.find(
					{
						level: { $regex: level },
						'episodes.1': { $exists: true },
						name: { $regex: courseName },
					},
					'-description -tags'
				).populate('creator', {
					courses: 0,
					mail: 0,
					name: 0,
					lastName: 0,
					role: 0,
				});

				return res.status(200).json(courses);
			}

			const courses = await Course.find(
				{
					'episodes.1': { $exists: true },
				},
				'-description -tags'
			).populate('creator', {
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
		try {
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
			});
			course.save();
			return res.status(201).json({ ...course._doc, creator: userCreator });
		} catch (error) {
			next(error);
		}
	}

	async edit(req, res, next) {
		try {
			const newCourseInformation = req.body;
			const { courseId } = req.params;

			// Check if the edited course already exist
			const course = await Course.findOne(newCourseInformation);
			const courseAlreadyExist = course;

			if (courseAlreadyExist) return res.status(409).json('COURSE_ALREADY_EXIST');

			const editor = req.user;
			const creatorId = String(course.creator);

			if (editor.id !== creatorId) return res.status(401).json('USER_NOT_AUTHORIZED');

			// Edit the course
			const updatedCourse = await Course.findByIdAndUpdate(courseId, modifiedInformation, { new: true });
			return res.status(200).json(updatedCourse);
		} catch (error) {
			next(error);
		}
	}

	async remove(req, res, next) {
		const courseToRemoveId = req.params.courseId;

		try {
			// Check if the course exist
			const courseToRemove = await Course.findById(courseToRemoveId);

			// Check if the creator is the remover
			const courseRemover = req.user.id;
			const creator = String(courseToRemove.creator);

			if (courseRemover !== creator) return res.status(401).json('USER_NOT_AUTHORIZED');

			// Remove the course
			await Course.findByIdAndRemove(courseToRemoveId);

			// Unsuscribe all the users
			await User.updateMany({ courses: { $in: courseToRemoveId } }, { $pull: { courses: courseToRemoveId } });

			// Delete all episodes
			await Episode.deleteMany({ course: courseToRemoveId });
			return res.status(200).json({ removedCourse: courseToRemove });
		} catch (error) {
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
			const courseToSuscribe = await Course.findByIdAndUpdate(
				courseId,
				{ $push: { subscribers: user.id } },
				{ new: true }
			);

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
