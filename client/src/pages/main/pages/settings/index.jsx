import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from 'components/input';
import Modal from 'components/modal';

import { useLoggedUser, useUsers } from 'hooks';
import { handleMultipleInfoUpdates } from 'utilities/updateInfo'

import './assets/sass/settings.scss';


const Settings = () => {
    const { loggedUser } = useLoggedUser();
    const [userInfo, setUserInfo] = useState(loggedUser);
    const { usersList, setUsersList } = useUsers();
    const { mail } = useParams();
    const navigateTo = useNavigate();


    // This save the new user info in usersList 
    const saveChanges = (event) => {
        event.preventDefault();

        setUsersList(prevUsers => (
            prevUsers.map(user => {
                if (user.mail === mail) {
                    return {
                        ...userInfo,
                    }

                }

                return user;
            })
        ))

        navigateTo(-1, { replace: true });
    }

    // Validators
    const isNameCorrect = /^[A-Z]{1,1}[a-z]+$/.test(userInfo.name);
    const isLastNameCorrect = /^[A-Z]{1,1}[a-z]+$/.test(userInfo.lastName);
    const isMailCorrect = /^[a-z_0-9]+@[a-z_]+?\.[a-zA-Z]{2,3}$/.test(userInfo.mail);
    const isMailAvaiable = userInfo.mail === loggedUser.mail || !usersList.some(user => user.mail === userInfo.mail);
    const isPasswordCorrect = /[\w]{8,16}/.test(userInfo.password);
    const isAgeCorrect = userInfo.age >= 5 && userInfo.age <= 100;

    const validators = [isNameCorrect, isLastNameCorrect, isMailCorrect, isMailAvaiable, isPasswordCorrect, isAgeCorrect];
    const theresSomethingWrong = validators.some(validator => validator === false);


    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Settings</h1>
                    <p>Here you can change your information!</p>

                    <form>
                        <div className="basic-info">
                            <Input
                             label="Name"
                             value={userInfo.name}
                             onChange={(event) => handleMultipleInfoUpdates(setUserInfo, event)}
                             isCorrect={isNameCorrect}
                             errorMessage="The name is incorrect"
                             input={{
                                 type: "text",
                                 name: "name",
                                 placeholder: "Jhon"
                             }}
                            />

                            <Input
                             label="Last Name"
                             value={userInfo.lastName}
                             onChange={(event) => handleMultipleInfoUpdates(setUserInfo, event)}
                             isCorrect={isLastNameCorrect}
                             errorMessage="The lastName is incorrect"
                             input={{
                                 type: "text",
                                 name: "lastName",
                                 placeholder: "Doe"
                             }}
                            />
                        </div>

                        <Input
                         label="Email"
                         value={userInfo.mail}
                         onChange={(event) => handleMultipleInfoUpdates(setUserInfo, event)}
                         isCorrect={isMailCorrect}
                         errorMessage="The mail is incorrect"
                         input={{
                             type: "email",
                             name: "mail",
                             placeholder: "JhonDoe@mail.com"
                         }}
                        />

                        <Input
                         label="Password"
                         value={userInfo.password}
                         onChange={(event) => handleMultipleInfoUpdates(setUserInfo, event)}
                         isCorrect={isPasswordCorrect}
                         errorMessage="The password is incorrect"
                         input={{
                             type: "password",
                             name: "password",
                             placeholder: "JhonDoe_123"
                         }}
                        />

                        <Input
                         label="Age"
                         value={userInfo.age}
                         onChange={(event) => handleMultipleInfoUpdates(setUserInfo, event)}
                         isCorrect={isAgeCorrect}
                         errorMessage="The age should be > 5"
                         input={{
                             type: "number",
                             name: "age",
                             placeholder: "E.g. 12"
                         }}
                        />

                        {
                            isMailAvaiable ||
                            <p className="is-not-mail-avaiable">
                                There's one student with the same mail.
                            </p>
                        }

                        <div className="action-container">
                            <button
                             className="button"
                             type="reset"
                             onClick={() => navigateTo(-1, { replace: true })}>
                                Cancel
                            </button>

                            <button
                             className="button button-green"
                             onClick={saveChanges}
                             disabled={theresSomethingWrong}
                            >
                                Save Changes
                            </button>
                        </div>

                    </form>
                </article>
            </Modal>
        </main>
    )
}

export default Settings;