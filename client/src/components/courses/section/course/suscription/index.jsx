import { useCoursesContext } from 'src/contexts/course/course.context';
import ActionButton from 'src/components/common/action-button';
import { useUserContext } from 'src/contexts/user/user.context';
import { suscribeToCourse, unsuscribeToCourse } from 'src/services/courses';

export default function Suscription({ courseId, isUserSuscribed }) {
    const { modal, setModals } = useCoursesContext();
    const { updateInfo, isUserLogged } = useUserContext();

    function suscribe({ isLoading, setIsLoading }) {
        if (isLoading) return;
        if (!isUserLogged) return setModals({...modal, register: { ...modal.register, show: true }});

        setIsLoading(true);

        suscribeToCourse(courseId)
            .then(({ user }) => {
                updateInfo(user);
                setIsLoading(false);
            });
    }

    function unsuscribe({ isLoading, setIsLoading }) {
        if (isLoading) return;
        setIsLoading(true);

        unsuscribeToCourse(courseId)
            .then(({ user }) => {
                updateInfo(user);
                setIsLoading(false);
            });
    }

    const buttonToDisplay = !isUserSuscribed ? 
    <ActionButton className="suscription default-button" onClick={suscribe}>Suscribe</ActionButton> : 
    <ActionButton className="suscription default-button" onClick={unsuscribe}>Unsuscribe</ActionButton>;

    return (
        <>
            {buttonToDisplay}
        </>
    )
}