import SuscribeButton from './suscribe-button';
import UnsuscribeButton from './unsuscribe-button';

export default function Suscription({ courseId, isUserSuscribed }) {    

    const buttonToDisplay = !isUserSuscribed ? 
    <SuscribeButton courseId={courseId} /> :
    <UnsuscribeButton courseId={courseId} />;

    return (
        <>
            {buttonToDisplay}
        </>
    )
}