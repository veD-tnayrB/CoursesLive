// Validators
const namePattern = /^[A-Z]{1,1}[a-z]+$/;
const lastNamePattern = /^[A-Z]{1,1}[a-z]+$/;
const mailPattern = /^[a-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern = /[\w]{8,16}/;


const isBodyAUser = (req, res, next) => {
    const { name, lastName, mail, password } = req.body;

    // It first checks if the property exists and then checks if it is correct based on its pattern.
    const validators = {
        isNameIncorrect: name && !namePattern.test(name),
        isLastNameIncorrect: lastName && !lastNamePattern.test(lastName),
        isMailIncorrect: mail && !mailPattern.test(mail),
        isPasswordIncorrect: password && !passwordPattern.test(password)
    }

    try {
        const somethingWrong = Object.keys(validators).some(validator => validators[validator]); 

        if (somethingWrong) {
            throw Error('TheInfoDoesntMeetTheRequirements');

        }
        
    } catch (error) {
        next(error);

    }

    next()
}

export default isBodyAUser;