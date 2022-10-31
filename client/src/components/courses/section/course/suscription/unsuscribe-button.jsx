import * as React from 'react';
import { useUserContext } from "src/contexts/user/user.context";
import { unsuscribeToCourse } from "src/services/courses";
import ActionButton from "src/components/common/action-button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function UnsuscribeButton({ courseId }) {
    const [isButtonHovered, setIsButtonHovered] = React.useState(false);
    const { updateInfo } = useUserContext();

    function unsuscribe({ isLoading, setIsLoading }) {
        if (isLoading) return;
        setIsLoading(true);

        unsuscribeToCourse(courseId)
            .then(({ user }) => {
                updateInfo(user);
                setIsLoading(false);
            });
    }

    function toggleHover() {
        setIsButtonHovered(!isButtonHovered);
    }

    const icon = isButtonHovered ? <FavoriteBorderIcon className="icon" /> : <FavoriteIcon className="icon" />;

    return (
            <ActionButton 
                title="Unsuscribe"
                className={`suscription default-button ${icon}`} 
                onClick={unsuscribe}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
            >
                {icon}
            </ActionButton>
    )
}