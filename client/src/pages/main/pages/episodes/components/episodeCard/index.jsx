import { useNavigate } from 'react-router-dom';

// Icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';

import './episodeCard.scss';


const EpisodeCard = ({ episodeInfo, loggedUser }) => {
    const isAdmin = loggedUser.role === 'admin';
    const navigateTo = useNavigate();


    return (
        <li className="episode-item">
            <article 
             className="card"
             title={episodeInfo.title}
            >
                <h3>{episodeInfo.title}</h3>

                <p 
                 title={episodeInfo.overview}
                >
                    {episodeInfo.overview}
                </p>

                <div className="action-container">
                    <button
                     className="button button-green watch-button"
                     onClick={() => navigateTo(`watch/${episodeInfo.id}`)}
                    >
                        Watch episode
                    </button>

                    <div className="admin-container">
                        {
                            isAdmin &&
                            <>
                                <button
                                    className="button button-blue"
                                    onClick={() => navigateTo(`settings/${episodeInfo.id}`)}
                                    title="Modify"
                                >
                                    <ModeRoundedIcon className="icon" />
                                </button>
                                <button
                                    className="button button-red"
                                    onClick={() => navigateTo(`delete/${episodeInfo.id}`)}
                                    title="Delete"
                                >
                                    <DeleteRoundedIcon className="icon" />
                                </button>
                            </>
                        }
                    </div>

                </div>

            </article>
        </li>
    )
}

export default EpisodeCard;