import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersContext } from 'contexts/users';

import Modal from 'components/modal';

const DeleteStudent = () => {
    const { setUsersList } = useContext(UsersContext);
    const navigateTo = useNavigate();
    const { mail } = useParams();


    // Get the mail to the user to delete and delete it from the usersList
    const deleteUser = () => {
        setUsersList(prevUser => (
            prevUser.filter(user => user.mail !== mail)
        ))

        navigateTo(-1, { replace: true });
    }



    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Delete Student</h1>
                    <p>This action cant be undone.</p>

                    <div className="action-container">
                        <button
                         className="button cancel"
                         onClick={() => navigateTo(-1, { replace: true })}
                        >
                            Cancel
                        </button>

                        <button
                         className="button button-red"
                         onClick={deleteUser}
                        >
                            Delete
                        </button>
                    </div>
                </article>
            </Modal>
        </main>
    )
}

export default DeleteStudent;