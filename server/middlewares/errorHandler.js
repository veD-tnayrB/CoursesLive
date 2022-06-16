const errorHandler = (error, req, res, next) => {
    console.error(error);

    switch(error.message) {
        case 'UserNotFound':
            return res.status(404).json({ message: 'Oops, it seems that there is no record with that information 😞' })

        case 'TheUserAlreadyExist':
            return res.status(409).json({ message: 'Try to put a different password or email 😔' });

        case 'TheInfoDoesntMeetTheRequirements':
            return res.status(401).json({ message: 'The information passed does not meet the minimum accepted requirements 😕' });

        case 'UserWasntCreated':
            return res.status(409).json({ message: 'For some reason we have not been able to register your user, try again later 🤯' });
    
        case 'TokenIncorrect':
            return res.status(403).json({ message: 'Oops it looks like the entered token is incorrect 😟' });
    
        case '':
            return res.status(403).json({ message: 'Este es un error personalizado' });
    
        default:
            return res.status(500).json({ message: 'Oops, looks like the server has a problem ' });
    }
}

export default errorHandler;