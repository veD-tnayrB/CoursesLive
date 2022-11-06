import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Episode({ episode }) {
    const { courseId, episodeId } = useParams();
    const isSelected = episode.id === episodeId ? 'selected' : '';
    const [isHovered, setIsHovered] = React.useState(false);

    function hoverToggle() {
        setIsHovered((currentValue) => !currentValue);
    }

    return (
        <li className={`episode-item ${isSelected}`}>
            <Link to={`/courses/course/${courseId}/episode/${episode.id}`}>
                <div className="episode" onMouseEnter={hoverToggle} onMouseLeave={hoverToggle}>
                    <span>{episode.title}</span>
                    <p className="description">{episode.description}</p>

                    {isHovered && (
                        <button>
                            <DeleteIcon className="icon" id="delete" />
                        </button>
                    )}
                </div>
            </Link>
        </li>
    );
}
