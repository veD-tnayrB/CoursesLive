import jwt from 'jsonwebtoken';
import isTokenValid from './isTokenValid.js';

const isRoleValid = (rolesToCheck, req, res, next) => {
    const { authorization: token } = req.headers;

    isTokenValid(req, res, () => {
        try {
            const { role: userRole } = jwt.verify(token, process.env.JWT_SECRET);

            const isUserValid = rolesToCheck.some(role => role === userRole);
            const isUserInvalid = !isUserValid;
            
            if (isUserInvalid) {
                throw Error('user not authorized');
            }

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