import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Course from '../models/course.js';

// Get all the courses from data base
const getAll = (req, res, next) => {
    Course.find({  })
    .then(results => {
        return res.status(200).json({ results });
    })
    .catch(error => next(error))
}

// Suscribe the user to a course
const suscribe = (req, res, next) => {
    const { authorization: token } = req.body;
    const { courseId } = req.params;

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user id to the suscribers array
    Course.findByIdAndUpdate(courseId, { $push: { suscribers: userId }})
    .then(() => {

        // Update the user information
        User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true })
        .then(userUpdated => {

            return res.status(202).json({ user: userUpdated });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
}

// Unsuscribe the user
const unsuscribe = (req, res, next) => {
    const { authorization: token } = req.body;
    const { courseId } = req.params;

    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Remove the user id from the suscribe array
    Course.findByIdAndUpdate(courseId, { $pullAll: { suscribers: userId }})
    .then(() => {

        // Update again the user information
        User.findByIdAndUpdate(userId, { $pullAll: { courses: courseId }}, { new: true })
        .then(userUpdated => {
            return res.status().json({ user: userUpdated });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
}



export default { getAll, suscribe, unsuscribe };