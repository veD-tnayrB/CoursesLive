import { useUsersContext } from "src/contexts/users/users.context";
import ActionButton from "src/components/common/action-button";

export default function UserActions({ user }) {
    const { modals, setModals } = useUsersContext();

    function openModals({ event }) {
        const { id: name } = event.target;
        setModals({ ...modals, [name]: { show: true, payload: { userId: user.id, user } } });
    }

    return (
        <>
            <ActionButton
                title="Delete"
                id="delete"
                className="default-button"
                onClick={openModals}
            >
                <img
                    id="delete"
                    src="src/assets/icons/trash.svg"
                    alt=""
                    className="icon"
                />
            </ActionButton>

            <ActionButton
                title="Edit"
                id="edit"
                className="default-button"
                onClick={openModals}
            >
                <img
                    id="edit"
                    src="src/assets/icons/edit.svg"
                    alt=""
                    className="icon"
                />
            </ActionButton>
        </>
    )
}