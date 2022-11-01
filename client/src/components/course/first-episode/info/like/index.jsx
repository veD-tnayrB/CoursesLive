import * as React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useFirstEpisodeContext } from '../../context';
import { useUserContext } from 'src/contexts/user/user.context';

export default function Like() {
    const { user } = useUserContext();
    const { firstEpisode } = useFirstEpisodeContext();
    const itsLikeIt = firstEpisode?.peopleWhoLikedIt?.some(person => person === user.id);
    const [isLikeit, setIsLikeIt] = React.useState(itsLikeIt);
    
    const Icon = isLikeit ? ThumbUpAltIcon : ThumbUpOffAltIcon;

    function toggleLike() {
        setIsLikeIt(!isLikeit);        
    }

    return (
        <div className="like-container">
            <button onClick={toggleLike}>
                <Icon className="icon" />
            </button>
        </div>
    )
}