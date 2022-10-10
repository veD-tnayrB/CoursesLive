import { unsuscribeToCourse } from "src/services/courses";
import { useUserContext } from "src/contexts/user/user.context";

export default function UnsuscribeButton({ courseId, setIsSuscribed }) {
    const { updateInfo } = useUserContext();

    async function unsuscribe() {
        const { user } = await unsuscribeToCourse(courseId);
        updateInfo(user);
    }

    return (
        <button 
            onClick={unsuscribe}
            className="default-button"
        >
            Unsuscribe
        </button>
    )
}