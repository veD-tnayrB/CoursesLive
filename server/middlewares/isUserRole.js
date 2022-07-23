import jwt from 'jsonwebtoken';
import isTokenValid from './isTokenValid.js';
import User from '../models/user.js';

const isRoleValid = (rolesToCheck, req, res, next) => {
    const { authorization: token } = req.headers;

    isTokenValid(req, res, async () => {
        try {
            const { id: userId,  role: userRole } = jwt.verify(token, process.env.JWT_SECRET);

            const isRoleCorrect = rolesToCheck.some(role => role === userRole);
            const isRoleIncorrect = !isRoleCorrect;
            
            if (isRoleIncorrect) {
                throw Error('user not authorized');
            }

            // Check in the database if the user is actually correct
            const user = await User.findOne({ id: userId, role: userRole });
            const userIsntCorrect = !user;

            if (userIsntCorrect) {
                throw Error('user not authorized');
            }

            req.user = { id: userId, role: userRole };

            next();

        } catch (error) {
            next(error)
        }
    })

}

const isUserTeacher = (req, res, next) => isRoleValid(['teacher'], req, res, next);

const isUserAdmin = (req, res, next) => isRoleValid(['admin'], req, res, next);

const isUserAdminOrTeacher = (req, res, next) => isRoleValid(['admin', 'teacher'], req, res, next);

const isUserStudent = (req, res, next) => isRoleValid(['student'], req, res, next);

export { isUserTeacher, isUserAdmin, isUserAdminOrTeacher, isUserStudent };