import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Course from '../models/course.js';


// Get all the courses from data base
const getAll = async (req, res, next) => {
    try {
        const courses = await Course.find({});
        
        return res.status(200).json(courses);
            
    } catch (error) {
        next(error);
    }
}

// Create a course
const create = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const courseInfo = req.body;

    try {
        const creator = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is a real admin
        const creatorIsAdmin = User.findOne({ id: creator.id, role: creator.role });
        const creatorIsntAdmin = !creatorIsAdmin;

        if (creatorIsntAdmin) {
            throw Error('user not authorized');
        }

        // Check if the course already exist
        const courseAlreadyExist = await Course.findOne({ name: courseInfo.name });

        if (courseAlreadyExist) {
            throw Error('course already exist');
        }

        const newCourse = {
            name: courseInfo.name,
            description: courseInfo.description,
            level: courseInfo.level,
            tags: courseInfo.tags,
            creator: creator.id,
            suscribers: []
        }

        // Create the course
        const course = await Course.create(newCourse);
        const courseWasntCreated = !course;

        if (courseWasntCreated) {
            throw Error('course wasnt created');
        }

        course.save();
        return res.status(201).json(course);

    } catch (error) {
        next(error);
    }
}

// Edit the course
const edit = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const newCourseInformation = req.body;
    const { courseId } = req.params;

    const modifiedInformation = {
        name: newCourseInformation.name,
        description: newCourseInformation.description,
        level: newCourseInformation.level,
        tags: newCourseInformation.tags
    }

    try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exist
        const user = await User.findById(userId);
        const userDoesntExist = !user;

        if (userDoesntExist) {
            throw Error('user doesnt exist');
        }

        // edit the course
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
    const { authorization: token } = req.headers;
    const courseToRemoveId = req.params.courseId;

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is admin
        const userIsAdmin = await User.findOne({ id: user.id, role: user.role });
        const userIsntAdmin = !userIsAdmin;

        if (userIsntAdmin) {
            throw Error('user not authorized');
        }

        // Remove the course
        const courseToRemove = await Course.findByIdAndRemove(courseToRemoveId);
        const courseDoesntExist = !courseToRemove;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }

        await User.updateMany({ courses: { $in: courseToRemoveId } }, { $pull: { courses: courseToRemoveId } });

        return res.status(200).json({ removedCourse: courseToRemove });

    } catch (error) {
        next(error);
    }
}

// Suscribe the user to a course
const suscribe = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { courseId } = req.params;

    try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user already exist
        const userToUnsuscribe = await User.findById(userId);
        const userDoesntExist = !userToUnsuscribe;

        if (userDoesntExist) {
            throw Error('user not found');
        }

        // Check if the user is already suscribed
        const isUserAlreadySuscribed = userToUnsuscribe.courses.some(course => String(course) === courseId);

        if (isUserAlreadySuscribed) {
            throw Error('user is already suscribed');
        }

        // Add the user id to the suscribers array
        const courseToSuscribe = await Course.findByIdAndUpdate(courseId, { $push: { subscribers: userId } }, { new: true });
        const courseDoesntExist = !courseToSuscribe;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }
        
        // Update the user information
        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true });
        return res.status(202).json({ user: updatedUser, course: courseToSuscribe });

    } catch (error) {
        next(error);
    }
}

// Unsuscribe the user
const unsuscribe = async (req, res, next) => {
    const { authorization: token } = req.headers;
    const { courseId } = req.params;

    try {
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user already exist
        const userToUnsuscribe = await User.findById(userId);
        const userDoesntExist = !userToUnsuscribe;

        if (userDoesntExist) {
            throw Error('user not found');
        }

        // Check if the user is already suscribed
        const isUserSuscribed = userToUnsuscribe.courses.some(course => String(course) === courseId);
        const userIsntSuscribed = !isUserSuscribed;

        if (userIsntSuscribed) {
            throw Error('user isnt suscribed');
        }

        // Remove the user id from the suscribers array
        const courseToUnsuscribe = await Course.findByIdAndUpdate(courseId, { $pull: { suscribers: userId } })
        const courseDoesntExist = !courseToUnsuscribe;

        if (courseDoesntExist) {
            throw Error('course doesnt exist');
        }

        // Update the courses array
        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { courses: courseId } }, { new: true });
        return res.status(202).json({ user: updatedUser });

    } catch (error) {
        next(error);
    }
}



export { getAll, create, edit, remove, suscribe, unsuscribe };