// Validators
const namePattern = /^[A-Z]{1,1}[a-z]$/;
const lastNamePattern = /^[A-Z]{1,1}[a-z]+$/;
const mailPattern = /^[a-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern = /[\w]{8,16}/;


const isBodyAUser = (req, res, next) => {
    const { name, lastName, mail, password, age } = req.body;

    const validators = {
        isNameIncorrect: !namePattern.test(name),
        isLastNameIncorrect: !lastNamePattern.test(lastName),
        isMailIncorrect: !mailPattern.test(mail),
        isPasswordIncorrect: !passwordPattern.test(password),
        isAgeIncorrect: age <= 5 && age >= 120
    }

    const somethingWrong = Object.keys(validators).some(validator => validator === true); 

    if (somethingWrong) {
        return res.status(403).json({ 
            message: 'Oops, it looks like some of the data doesnt meet the requirements'
        });
    }

    next()
}

export default isBodyAUser;