import { useCoursesContext } from "src/contexts/course/course.context";

export default function EditModalActions({ isInfoCorrect }) {
    const { setModals } = useCoursesContext();

    function back() {
        setModals(othersModals => ({...othersModals, edit: {...othersModals.edit, show: false}}));
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
                Edit
            </button>
        </div>
    )
}