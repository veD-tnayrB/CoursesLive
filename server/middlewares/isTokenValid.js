import jwt from 'jsonwebtoken';

const isTokenValid = (req, res, next) => {
    const { authorization: token } = req.headers;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const isDecodedTokenIncorrect = !decodedToken;

    } catch (error) {
        next(error);
    }

    next();
}

export default isTokenValid;