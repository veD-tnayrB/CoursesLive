import { useNavigate } from 'react-router-dom';

import Input from 'components/input';
import Modal from 'components/modal';

import { useUsers, useForm } from 'hooks';

import './assets/sass/register.scss';


const Register = () => {
    const form = useForm({
        name: '',
        lastName: '',
        mail: '',
        password: '',
        age: '5'
    })
    const { usersList, setUsersList } = useUsers();
    const navigateTo = useNavigate();


    // Save the current info in the usersList context and also log it
    const saveUser = (event) => {
        event.preventDefault();

        setUsersList(prevUsers => (
            [
                ...prevUsers,
                {
                    role: 'student',
                    isLogged: true,
                    ...form.info,
                    courses: [],
                    busyDays: []
                }
            ]
        ))

        navigateTo(-1, { replace: true });
    }

    // Validators
    const isNameCorrect = /^[A-Z]{1,1}[a-z]+$/.test(form.info.name);
    const isLastNameCorrect = /^[A-Z]{1,1}[a-z]+$/.test(form.info.lastName);
    const isMailCorrect = /^[a-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/.test(form.info.mail);
    const isMailAvaiable = !usersList.some(user => user.mail === form.info.mail);
    const isPasswordCorrect = /[\w]{8,16}/.test(form.info.password);
    const isAgeCorrect = form.info.age >= 5 && form.info.age <= 100;

    const validators = [isNameCorrect, isLastNameCorrect, isMailCorrect, isMailAvaiable, isPasswordCorrect, isAgeCorrect];
    const theresSomethingWrong = validators.some(validator => validator === false);


    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <div className="basic-description">
                        <h1>Welcome to CoursesLive</h1>
                        <p>
                            Welcome to the most complete academy about Full Stack development!
                        </p>
                    </div>

                    <form onSubmit={saveUser}>
                        <div className="basic-info">
                            <Input
                             label="Name"
                             value={form.info.name}
                             onChange={form.handleChanges}
                             isCorrect={isNameCorrect}
                             errorMessage="The name should be capitalized"
                             input={{
                                 type: "text",
                                 name: "name",
                                 placeholder: "Jhon"
                             }}
                            />

                            <Input
                             label="Last Name"
                             value={form.info.lastName}
                             onChange={form.handleChanges}
                             isCorrect={isLastNameCorrect}
                             errorMessage="The last name should be capitalized"
                             input={{
                                 type: "text",
                                 name: "lastName",
                                 placeholder: "Doe"
                             }}
                            />
                        </div>

                        <Input
                         label="Email"
                         value={form.info.mail}
                         onChange={form.handleChanges}
                         isCorrect={isMailCorrect}
                         errorMessage="The mail shouldnt be capitalized"
                         input={{
                             type: "email",
                             name: "mail",
                             placeholder: "JhonDoe@mail.com"
                         }}
                        />

                        <Input
                         label="Password"
                         value={form.info.password}
                         onChange={form.handleChanges}
                         isCorrect={isPasswordCorrect}
                         errorMessage="The password should be have min 8 letters/numbers and max 16"
                         input={{
                             type: "password",
                             name: "password",
                             placeholder: "JhonDoe_123"
                         }}
                        />

                        <Input
                         label="Age"
                         value={form.info.age}
                         onChange={form.handleChanges}
                         isCorrect={isAgeCorrect}
                         errorMessage="The min age is 5 and the max is 100"
                         input={{
                             type: "number",
                             name: "age",
                             placeholder: "E.g. 12"
                         }}
                        />

                        {
                            isMailAvaiable ||
                            <p className="user-already-exist-message">
                                The user already exists try logging in
                            </p>
                        }

                        <div className="action-container">
                            <button
                             type="reset"
                             className="button"
                             onClick={() => navigateTo(-1, { replace: true })}
                            >
                                Cancel
                            </button>

                            <button
                             className="button button-green"
                             disabled={theresSomethingWrong}
                            >
                                Sign Up!
                            </button>
                        </div>

                    </form>
                </article>
            </Modal>
        </main>
    )
}

export default Register;