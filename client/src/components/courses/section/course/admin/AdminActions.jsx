import ActionButton from "src/components/common/action-button";

export default function AdminActions({ courseId }) {


    return (
        <>

            <ActionButton>
                <img
                    src="src/assets/icons/trash.svg"
                    alt=""
                />
            </ActionButton>

            <ActionButton>
                <img
                    src="src/assets/icons/edit.svg"
                    alt=""
                />
            </ActionButton>
        </>
    )
}