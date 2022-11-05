import * as React from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useUserContext } from 'src/contexts/user/user.context';
import { useCourseContext } from 'src/contexts/course/course.context';
import './like.scss';

export default function Like() {
    const { user } = useUserContext();
    const { selectedEpisode } = useCourseContext();
    const itsLikeIt = selectedEpisode?.peopleWhoLikedIt?.some(person => person === user.id);
    const [isLikeit, setIsLikeIt] = React.useState(itsLikeIt);
    
    const Icon = isLikeit ? ThumbUpAltIcon : ThumbUpOffAltIcon;

    function toggleLike() {
        setIsLikeIt(!isLikeit);        
    }

    return (
        <div className="like">
            <button onClick={toggleLike}>
                <Icon className="icon" />
            </button>

            <span>3M Likes</span>
        </div>
    )
}