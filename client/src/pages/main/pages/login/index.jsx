import { useNavigate } from 'react-router-dom';

import Modal from 'components/modal';
import Input from 'components/input';

import { useUsers, useForm } from 'hooks';


const Login = () => {
    const form = useForm({
        mail: '',
        password: ''
    })
    const { usersList, setUsersList } = useUsers();
    const navigateTo = useNavigate();


    // look for the user for his mail and put their islogged property to true
    const logStudent = (event) => {
        event.preventDefault();

        setUsersList(prevUser => (
            prevUser.map(user => {
                if (user.mail === registeredInfo.mail) {
                    return {
                        ...user,
                        isLogged: true
                    }
                }

                return user;
            })
        ))


        navigateTo('/', { replace: true });
    }

    // Validators
    const studentAlreadyExist = usersList.some(user => user.mail === form.info.mail);
    const registeredInfo = usersList.find(user => user.mail === form.info.mail);
    const isPasswordCorrect = registeredInfo && registeredInfo.password === form.info.password;
    
    const validators = [studentAlreadyExist, isPasswordCorrect];
    const isSomethingWrong = validators.some(validator => validator === false);
    

    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Welcome again!</h1>
                    <p>We are very proud that you are here.</p>

                    <form onSubmit={logStudent}>
                        <Input
                         label="Email"
                         value={form.info.mail}
                         onChange={form.handleChanges}
                         isCorrect={studentAlreadyExist}
                         errorMessage="This student doesnt exist"
                         input={{
                             type: "text",
                             name: "mail",
                             placeholder: "JhonDoe@mail.com"
                         }}
                        />

                        <Input
                         label="Password"
                         value={form.info.password}
                         onChange={form.handleChanges}
                         isCorrect={isPasswordCorrect}
                         errorMessage="The password is incorrect"
                         input={{
                             type: "text",
                             name: "password",
                             placeholder: "JhonDoe_123"
                         }}
                        />

                        <div className="action-container">
                            <button
                             className="button"
                             onClick={() => navigateTo(-1, { replace: true })}
                             type="reset"
                            >
                                Cancel
                            </button>

                            <button
                             className="button button-green"
                             disabled={isSomethingWrong}
                            >
                                Log in
                            </button>

                        </div>
                    </form>
                </article>
            </Modal>
        </main>
    )
}

export default Login;