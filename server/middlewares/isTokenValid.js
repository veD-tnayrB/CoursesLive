import jwt from 'jsonwebtoken';

const isTokenValid = (req, res, next) => {
    const { authorization: token } = req.headers;

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) {
        res.status(403).json({ message: 'Oops it looks like the entered token is incorrect 😟' })
    }

    next();
}

export default isTokenValid;