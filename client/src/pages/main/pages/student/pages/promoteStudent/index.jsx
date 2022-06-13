import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UsersContext } from 'contexts/users';

import Modal from 'components/modal';


const PromoteStudent = () => {
    const { setUsersList } = useContext(UsersContext);
    const navigateTo = useNavigate();
    const { mail } = useParams();


    // Get the user to be promoted for their id and set their admin property to true
    const promoteUser = () => {
        setUsersList(prevUsers => (
            prevUsers.map(user => {
                if (user.mail === mail) {
                    return {
                        ...user,
                        role: 'admin'
                    }
                }

                return user;
            })
        ))

        navigateTo(-1, { replace: true });
    }

    
    return (
        <main className="modal-container">
            <Modal>
                <article>
                    <h1>Are you sure?</h1>
                    <p>This always can be undone.</p>

                    <div className="action-container">
                        <button
                         className="button cancel"
                         onClick={() => navigateTo(-1, { replace: true })}
                        >
                            Cancel
                        </button>

                        <button
                         className="button button-blue"
                         onClick={promoteUser}
                        >
                            Promote
                        </button>
                    </div>
                </article>
            </Modal>
        </main>
    )
}

export default PromoteStudent;