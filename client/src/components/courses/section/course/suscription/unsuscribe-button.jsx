import * as React from 'react';
import { useUserContext } from "src/contexts/user/user.context";
import { unsuscribeToCourse } from "src/services/courses";
import ActionButton from "src/components/common/action-button";

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

    const icon = isButtonHovered ? 'unsuscribe' : 'suscribed';

    return (
            <ActionButton 
                className={`suscription default-button ${icon}`} 
                onClick={unsuscribe}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
            >
                <img 
                    src={`src/assets/icons/${icon}.svg`} 
                    alt=""
                    className="icon" 
                />
            </ActionButton>
    )
}