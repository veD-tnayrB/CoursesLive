import { useUsersContext } from "src/contexts/users/users.context";
import { removeUser } from "src/services/user";
import DeleteModal from "src/components/common/modals/delete-modal";

export default function DeleteUsersModal() {
    const { modals, setModals } = useUsersContext();
    const { userId } = modals.delete.payload;
    
    function remove({ setIsLoading }) {
        setIsLoading(true);

        removeUser(userId)
        .then(() => {
            setUsers(users => (users.filter(user => user.id !== userId)));
            setIsLoading(false);
            onHide();
        });
    }

    return (
        <DeleteModal 
            modals={modals}
            setModals={setModals}
            description="This operation is irreversible."
            remove={remove}
        />
    )
}