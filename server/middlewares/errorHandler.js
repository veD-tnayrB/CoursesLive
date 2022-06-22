const errorHandler = (error, req, res, next) => {
    console.error(error);

    switch(error.message) {
        case 'user not found':
            return res.status(404).json({ message: 'Oops, it seems that there is no user with such information 😞' })

        case 'the user already exist':
            return res.status(409).json({ message: 'Try to put a different password or email 😔' });

        case 'info doesnt meet the requirements':
            return res.status(401).json({ message: 'The information passed does not meet the minimum accepted requirements 😕' });

        case 'user wasnt created':
            return res.status(409).json({ message: 'For some reason we have not been able to register your user, try again later 🤯' });
    
        case 'invalid token':
            return res.status(403).json({ message: 'Oops it looks like the entered token is incorrect 😟' });
    
        case 'course already exist':
            return res.status(409).json({ message: 'Oops it seems that a course with that name already exists 😥' });
        
        case 'course doesnt exist':
            return res.status(404).json({ message: 'We couldn\'t find the course you requested 😧' });

        case 'course wasnt created':
            return res.status(417).json({ message: 'The course could not be created for some reason, please try again 🙊' });
    
        case 'user not authorized':
            return res.status(401).json({ message: 'You do not have the necessary permissions to make this request 🤨' });

        case 'user is already suscribed':
            return res.status(406).json({ message: 'You are already suscribed to this course. 😡' })

        case 'user isnt suscribed':
            return res.status(400).json({ message: 'You arent suscribed to this course 💀' }) 

        default:
            return res.status(500).json({ message: 'Oops, looks like the server has a problem ' });
    }
}

export default errorHandler;