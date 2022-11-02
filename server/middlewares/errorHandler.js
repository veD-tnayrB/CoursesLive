
// This is where I handle every errors
const ERRORS = {

    // USER ERRORS

    'user not found': {
        message: 'Oops, it seems that there is no user with such information 😞',
        status: 404
    },
    
    'the user already exist': {
        message: 'Try to put a different password or email 😔',
        status: 409
    },

    'role invalid': {
        message: 'The role you are trying to request is invalid 🤨',
        status: 400
    },

    'info doesnt meet the requirements': {
        message: 'The information passed does not meet the minimum accepted requirements 😕',
        status: 401
    },

    'user wasnt created': {
        message: 'For some reason we have not been able to register your user, try again later 🤯',
        status: 409
    },

    'user wasnt edited': {
        message: 'The user could not be edited for some reason 😟',
        status: 304
    },

    'user not authorized': {
        message: 'You do not have the necessary permissions to make this request 🤨',
        status: 401
    },

    'user is already suscribed': {
        message: 'You are already suscribed to this course. 😡',
        status: 406
    },

    'user isnt suscribed': {
        message: 'You arent suscribed to this course 💀',
        status: 400
    },

    'invalid token': {
        message: 'Oops it looks like the entered token is incorrect 😟',
        status: 403
    },

    // COURSE ERRORS

    'course already exist': {
        message: 'Oops it seems that a course with that name already exists 😥',
        status: 409
    },

    'course doesnt exist': {
        message: 'We couldn\'t find the course you requested 😧',
        status: 404
    },


    'course wasnt created': {
        message: 'The course could not be created for some reason, please try again 🙊',
        status: 417
    },

    'course hasnt episodes': {
        message: 'The specified course has no episodes... still 😉',
        status: 204
    },

    'you dont have permisions to make this request': {
        message: "ME CAGO EN LA PUTA",
        status: 400
    },


    // EPISODE ERRORS

    'episode already exist': {
        message: 'Oops it seems that there is already an episode with this video 🤡',
        status: 409
    },

    'episode wasnt modified': {
        message: 'For some unknown reason the episode could not be modified 😮',
        status: 304
    },

    'server error': {
        message: 'Oops, looks like the server has a problem 🤒🤕',
        status: 500
    }
}


const errorHandler = (error, req, res, next) => {
    const errorDescription = ERRORS[error.message];
    const theresNoErrorForThisCase = !errorDescription;

    // Detect if theres any error for this case, if the answer is no send the server error message
    if (theresNoErrorForThisCase) {
        const serverError = ERRORS['server error'];

        return res.status(serverError.status).json({ 
            message: serverError.message, 
            status: serverError.status 
        });
    }
    
    return res.status(errorDescription.status).json({ 
        message: errorDescription.message, 
        status: errorDescription.status 
    });
}

export default errorHandler;