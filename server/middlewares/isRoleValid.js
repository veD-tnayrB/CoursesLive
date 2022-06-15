import jwt from 'jsonwebtoken';
import isTokenValid from './isTokenValid.js';

const isRoleValid = (rolesToCheck, req, res, next) => {
    const { authorization: token } = req.headers;

    isTokenValid(req, res, () => {
        try {
            const { role: userRole } = jwt.verify(token, process.env.JWT_SECRET);

            const isUserValid = rolesToCheck.some(role => role === userRole);

            if (isUserValid) {
                throw Error('UserNotAuthorized');
            }

            next();

        } catch (error) {
            next(error)
        }
    })
    
}

export default isRoleValid;