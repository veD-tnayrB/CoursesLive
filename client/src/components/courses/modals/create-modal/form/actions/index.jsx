import { useCoursesContext } from "src/contexts/course/course.context";

export default function CreationModalActions({ isInfoCorrect }) {
    const { setModals } = useCoursesContext();

    function back() {
        setModals({...othersModals, create: false});
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

            <button
                className="primary-button"
                disabled={!isInfoCorrect}
            >
                Create
            </button>
        </div>
    )
}