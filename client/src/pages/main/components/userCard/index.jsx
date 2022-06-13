import { useNavigate } from 'react-router-dom';

// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';

import './userCard.scss';


const UserCard = ({ user, loggedUser }) => {
    const isWhoIsLogged = user.mail === loggedUser.mail;
    const navigateTo = useNavigate();
    

    return (
        <li className="user-item">
            <article className="card">
                <div className="basic-info">
                    <h1 
                     title={`${user.name} ${user.lastName}`}
                    >
                        {user.name} {user.lastName}
                    </h1>
                    <span>{user.age}</span>
                    {
                        isWhoIsLogged &&
                        <div className="me-indicator"></div>
                    }
                </div>
                <p title={user.mail}>{user.mail}</p>

                {
                    isWhoIsLogged ||
                    (
                        <div className="admin-action-container">
                        {
                            user.role === 'admin' ?
                                <button
                                 className="button button-red"
                                 onClick={() => navigateTo(`delegate/${user.mail}`)}
                                 title="Delegate"
                                >
                                    <PersonOffRoundedIcon className="icon with-text" />
                                    Delegate
                                </button>
                                :
                                <button
                                 className="button button-blue"
                                 onClick={() => navigateTo(`promote/${user.mail}`)}
                                 title="Promote"
                                >
                                    <SupervisorAccountRoundedIcon className="icon with-text" />
                                    Promote
                                </button>
                            }

                            <button 
                             className="button button-red delete-button"
                             onClick={() => navigateTo(`delete/${user.mail}`)}
                             title="Delete"
                            >
                                <DeleteRoundedIcon className="icon" />
                            </button>
                        </div>
                    )
                }
            </article>
        </li>
    )
}

export default UserCard;