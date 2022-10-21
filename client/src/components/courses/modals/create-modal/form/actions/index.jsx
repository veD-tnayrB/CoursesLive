import { useCoursesContext } from "src/contexts/course/course.context";
import ActionButton from "src/components/common/action-button";

export default function CreationModalActions({ isInfoCorrect }) {
    const { setModals } = useCoursesContext();

    function back() {
        setModals(othersModals => ({...othersModals, create: {...othersModals.create, show: false}}));
    }

    return (
        <div className="actions-container">
            <button
                onClick={back}
                type="reset"
                className="secondary-button"
            >
                Back
            </button>

            <ActionButton
                className="primary-button"
                disabled={!isInfoCorrect}
            >
                Create
            </ActionButton>
        </div>
    )
}