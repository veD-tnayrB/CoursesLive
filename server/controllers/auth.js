import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Log the user
const login = async (req, res, next) => {
    const userDetails = req.body;

    try {
        // Log the user by sending the token to the client and the user information
        const user = await User.findOne({ mail: userDetails.mail, password: userDetails.password });
        const userDoesntExist = !user;
        
        if (userDoesntExist) {
            throw Error('user not found');
        }
        
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).json({ user, token });

    } catch (error) {
        next(error);
    }
}


// Register a user
const signup = async (req, res, next) => {
    const newUserDetails = req.body;

    try {
        // Search for a user with the same mail
        const user = await User.findOne({ mail: newUserDetails.mail });
        const userAlreadyExist = user;
        console.log(user)
        
        if (userAlreadyExist) {
            throw Error('the user already exist');
        }

        const DEFAULT_ROLE = 'student';

        const newUserInformaton = {
            ...newUserDetails,
            role: DEFAULT_ROLE,
            courses: []
        }

        // Create the user and send the token
        const newUser = await User.create(newUserInformaton);
        const userWasntCreated = !newUser;

        if (userWasntCreated) {
            throw Error('user wasnt created');
        }
        console.log(2)
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET);
        newUser.save();
        console.log(3)
        return res.status(201).json({ user: newUser, token });
    
    } catch (error) {
        next(error);
    }

}


export { login, signup };