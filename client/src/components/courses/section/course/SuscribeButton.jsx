import { useUserContext } from "src/contexts/user/user.context";
import { suscribeToCourse } from "src/services/courses";

export default function SuscribeButton({ courseId, setIsSuscribed }) {
    const { updateInfo } = useUserContext();

    async function suscribe() {
        const { user } = await suscribeToCourse(courseId);
        updateInfo(user);
    }

    return (
        <button 
            onClick={suscribe}
            className="default-button"
        >
            Suscribe
        </button>
    )
}