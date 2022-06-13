import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UsersContext } from 'contexts/users';

import Modal from 'components/modal';


const DelegateStudent = () => {
    const { setUsersList } = useContext(UsersContext);
    const navigateTo = useNavigate();
    const { mail } = useParams();
    

    // Get the current student mail and set their admin property to false
    const delegateStudent = () => {
        setUsersList(prevUsers => (
            prevUsers.map(user => {
                if (user.mail === mail) {
                    return {
                        ...user,
                        role: 'student'
                    }
                }

                return user;
            })
        ))

        navigateTo(-1, { replace: true })
    }

    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Delegate Student</h1>
                    <p>This accion always can be undone! Remenber it</p>

                    <div className="action-container">
                        <button
                         className="button cancel"
                         onClick={() => navigateTo(-1, { replace: true })}
                        >
                            Cancel
                        </button>

                        <button
                         className="button button-red"
                         onClick={delegateStudent}
                        >
                            Delegate
                        </button>
                    </div>
                </article>
            </Modal>
        </main>
    )
}

export default DelegateStudent;