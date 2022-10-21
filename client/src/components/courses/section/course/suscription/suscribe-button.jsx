import * as React from 'react';
import { suscribeToCourse } from "src/services/courses";
import { useCoursesContext } from "src/contexts/course/course.context";
import { useUserContext } from "src/contexts/user/user.context";
import ActionButton from "src/components/common/action-button";

export default function SuscribeButton({ courseId }) {
    const [isButtonHovered, setIsButtonHovered] = React.useState(false);
    const { modals, setModals } = useCoursesContext();
    const { updateInfo, isUserLogged } = useUserContext();

    function suscribe({ isLoading, setIsLoading }) {
        if (isLoading) return;
        if (!isUserLogged) return setModals({ ...modals, register: { ...modals.register, show: true } });

        setIsLoading(true);

        suscribeToCourse(courseId)
            .then(({ user }) => {
                updateInfo(user);
                setIsLoading(false);
            });
    }

    function toggleHover() {
        setIsButtonHovered(!isButtonHovered);
    }

    const icon = isButtonHovered ? 'suscribed' : 'unsuscribe';
    
    return (
        <ActionButton 
        className="suscription default-button" 
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover} 
        onClick={suscribe}
        >
            <img 
                src={`src/assets/icons/${icon}.svg`} 
                alt="" 
                className="icon"
            />
            Suscribe
        </ActionButton>
    )
}