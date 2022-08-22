import User from '../models/user.js';
import Course from '../models/course.js';
import Episode from '../models/episode.js';


// Get all the courses from data base
const getAll = async (req, res, next) => {
    try {
        const courses = await Course.find({  }).populate('episodes', {
            course: 0,
            creator: 0,
            comments: 0,
            video: 0,
            peopleWhoLikedIt: 0,
        });


        return res.status(200).json(courses);
            
    } catch (error) {
        next(error);
    }
}

// Filter by tags
const filterByTag = async (req, res, next) => {
    const tags = req.query.tags;

    try {
        // Find the courses
        const filteredCourses = await Course.find({ tags: { $all: tags } });
        const theresNoCoursesWithThoseTags = filteredCourses.length === 0;

        if (theresNoCoursesWithThoseTags) {
            throw Error('theres no courses with those tags');
        }

        return res.status(200).json(filteredCourses);
    } catch (error) {
        next(error);
    }
}

// Create a course
const create = async (req, res, next) => {
    const courseInfo = req.body;

    try {
        const creator = req.user;

        // Check if the course already exist
        const courseAlreadyExist = await Course.findOne({ name: courseInfo.name });

        if (courseAlreadyExist) {
            throw Error('course already exist');
        }

        const newCourse = {
            ...courseInfo,
            creator: creator.id,
            suscribers: []
        }

        // Create the course
        const course = await Course.create(newCourse);
        course.save();
        
        return res.status(201).json(course);

    } catch (error) {
        next(error);
    }
}

// Edit the course
const edit = async (req, res, next) => {
    const newCourseInformation = req.body;
    const { courseId } = req.params;

    const modifiedInformation = {
        name: newCourseInformation.name,
        description: newCourseInformation.description,
        level: newCourseInformation.level,
        tags: newCourseInformation.tags
    }

    try {
        // Check if the edited course already exist
        const courseAlreadyExist = await Course.findOne(modifiedInformation);

        if (courseAlreadyExist) {
            throw Error('course already exist');
        }

        // Edit the course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, modifiedInformation, { new: true })
        const courseWasntUpdated = !updatedCourse;

        if (courseWasntUpdated) {
            throw Error('the course wasnt updated');
        }

        return res.status(200).json(updatedCourse);
    } catch (error) {
        next(error);
    }
}

// Remove course
const remove = async (req, res, next) => {
    const courseToRemoveId = req.params.courseId;

    try {
        // Check if the course exist and then remove it
        const courseToRemove = await Course.findByIdAndRemove(courseToRemoveId);
        const courseDoesntExist = !courseToRemove;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }

        // Unsuscribe all the users
        await User.updateMany({ courses: { $in: courseToRemoveId } }, { $pull: { courses: courseToRemoveId } });

        // Delete all episodes
        await Episode.deleteMany({ course: courseToRemoveId });

        return res.status(200).json({ removedCourse: courseToRemove });

    } catch (error) {
        next(error);
    }
}

// Suscribe the user to a course
const suscribe = async (req, res, next) => {
    const { courseId } = req.params;

    try {
        const user = req.user;

        // Check if the user is already suscribed
        const isUserAlreadySuscribed = await User.findOne({ _id: user.id, courses: { $in: [ courseId ] } })

        if (isUserAlreadySuscribed) {
            throw Error('user is already suscribed');
        }

        // Add the user id to the suscribers array
        const courseToSuscribe = await Course.findByIdAndUpdate(courseId, { $push: { subscribers: user.id } }, { new: true });
        const courseDoesntExist = !courseToSuscribe;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }
        
        // Update the user information
        const updatedUser = await User.findByIdAndUpdate(user.id, { $push: { courses: courseId } }, { new: true });
        return res.status(202).json({ user: updatedUser, course: courseToSuscribe });

    } catch (error) {
        next(error);
    }
}

// Unsuscribe the user
const unsuscribe = async (req, res, next) => {
    const { courseId } = req.params;

    try {
        const user = req.user;

        // Check if the user is already suscribed
        const isUserSuscribed = await User.findOne({ _id: user.id, courses: { $all: [ courseId ] } })
        const isntUserSuscribed = !isUserSuscribed;

        if (isntUserSuscribed) {
            throw Error('user isnt suscribed');
        }

        // Remove the user id from the suscribers array
        const courseToUnsuscribe = await Course.findByIdAndUpdate(courseId, { $pull: { suscribers: user.id } })
        const courseDoesntExist = !courseToUnsuscribe;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }

        // Update the courses array
        const updatedUser = await User.findByIdAndUpdate(user.id, { $pull: { courses: courseId } }, { new: true });
        return res.status(202).json({ user: updatedUser });

    } catch (error) {
        next(error);
    }
}



export { getAll, filterByTag, create, edit, remove, suscribe, unsuscribe };