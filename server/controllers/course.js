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
    const courseInfo = req.body;

    try {
        // Check if the course already exist
        const courseAlreadyExist = await Course.find({ name: courseInfo.name });

        if (courseAlreadyExist) {
            throw Error('CourseAlreadyExist');
        }

        const newCourse = {
            name: courseInfo.name,
            description: courseInfo.description,
            level: courseInfo.level,
            tags: courseInfo.tags,
            creator: courseInfo.creator,
            suscribers: []
        }

        // Create the course
        const course = await Course.create(newCourse);
        const courseWasntCreated = !course;

        if (courseWasntCreated) {
            throw Error('CourseWasntCreated');
        }

        course.save();
        return res.status(201).json(course);

    } catch (error) {
        next(error);
    }
}

// Suscribe the user to a course
const suscribe = async (req, res, next) => {
    const { authorization: token } = req.body;
    const { courseId } = req.params;

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    try {
        // Add the user id to the suscribers array
        const courseToSuscribe = await Course.findByIdAndUpdate(courseId, { $push: { suscribers: userId } });
        const courseDoesntExist = !courseToSuscribe;

        if (courseDoesntExist) {
            throw Error('CourseDoesntExist');
        }
        
        // Update the user information
        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true });
        return res.status(202).json({ user: updatedUser });

    } catch (error) {
        next(error);
    }
}

// Unsuscribe the user
const unsuscribe = async (req, res, next) => {
    const { authorization: token } = req.body;
    const { courseId } = req.params;

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    try {
        // Remove the user id from the suscribers array
        const courseToUnsuscribe = await Course.findByIdAndUpdate(courseId, { $pullAll: { suscribers: userId } })
        const courseDoesntExist = !courseToUnsuscribe;

        if (courseDoesntExist) {
            throw Error('CourseDoesntExist');
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true });
        return res.status(202).json({ user: updatedUser });

    } catch (error) {
        next(error);
    }
}



export { getAll, create, suscribe, unsuscribe };