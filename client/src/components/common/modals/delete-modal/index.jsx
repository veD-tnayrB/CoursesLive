import ModalContainer from "src/components/common/modal/ModalContainer";
import Modal from 'src/components/common/modal';
import ActionButton from "src/components/common/action-button";
import './delete-modal.scss';

export default function DeleteModal({ modals, setModals, remove, description }) {


    function onHide() {
        setModals({...modals, delete: {...modals.delete, show: false}});
    }

    return (
        <ModalContainer
            className="delete-modal" 
            show={modals.delete.show}
        >
            <Modal
                setModals={setModals}
                modal="delete"
            >
                <h1 className="title">Are you sure?</h1>
                <p>
                    {description}
                </p>
                <div className="actions-container">
                    <button onClick={onHide} className="secondary-button">
                        Cancel
                    </button>

                    <ActionButton onClick={remove} className="primary-button">
                        Yes, delete
                    </ActionButton>
                </div>
            </Modal>
        </ModalContainer>
    )
}