import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';

// Icons
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import LockIcon from '@mui/icons-material/Lock';

import './courseCard.scss';


const CourseCard = ({ courseInfo, loggedUser }) => {
    const isLoggedUserSuscribed = loggedUser.courses.some(course => course === courseInfo.id);
    const isStudentBusy = loggedUser.busyDays.some(day => (
        JSON.stringify(day) === JSON.stringify(courseInfo.days)
    ));
    const navigateTo = useNavigate();


    const daysElement = courseInfo.days.map(day => (
        <li
         key={uniqid()}
         className="day-item"
        >
            <div className="day-indicator">{day}</div>
        </li>
    ))


    return (
        <li className="course-item">
            <article className="card">
                <div className="title">
                    <h3 title={courseInfo.name}>{courseInfo.name}</h3>
                </div>

                <h4>Days:</h4>
                <ul>
                    {daysElement}
                </ul>

    
                    <div className="buttons-section">
                        <div className="action-container">
                        {
                            loggedUser.isLogged
                                ?
                            (
                                isLoggedUserSuscribed
                                    ?
                                <>
                                    <button
                                     className="button button-blue"
                                     onClick={() => navigateTo(`/course/${courseInfo.id}/episodes`)}
                                    >
                                        <AutoAwesomeMotionIcon className="icon with-text" />
                                        Episodes
                                    </button>

                                    <button
                                     className="button button-red unsuscribe-button"
                                     onClick={() => navigateTo(`unsuscribe/${courseInfo.id}`)}
                                     title="Unsuscribe"
                                    >
                                        <BookmarkRemoveIcon className="icon" />
                                    </button>
                                </>
                                    :
                                (
                                    isStudentBusy
                                        ?
                                    <button className="button occupied-date">
                                        <LockIcon className="icon with-text" />
                                        This date is occupied
                                    </button>
                                        :
                                    <button
                                     className="button button-green"
                                     onClick={() => navigateTo(`suscribe/${courseInfo.id}`)}
                                    >
                                        <BookmarkAddIcon className="icon with-text" />
                                        Suscribe
                                    </button>
                                )                          
                            )
                                :
                            <button 
                             className="button button-green"
                             title="Sign up for unlimited access to our courses"
                             onClick={() => navigateTo('/signup')}
                            >
                                Sign up!
                            </button>            
                        }
                    </div>

                    {
                        loggedUser.role === 'admin' &&
                        <div className="admin-action-container">
                            <button
                             className="button button-blue"
                             onClick={() => navigateTo(`settings/${courseInfo.id}`)}
                             title="Modify"
                            >
                                <ModeRoundedIcon className="icon" />
                            </button>

                            <button
                             className="button button-red"
                             onClick={() => navigateTo(`delete/${courseInfo.id}`)}
                             title="Delete"
                            >
                                <DeleteRoundedIcon className="icon" />
                            </button>
                        </div>
                    }
                </div>

            </article>
        </li>
    )
}

export default CourseCard;