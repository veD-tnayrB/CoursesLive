import { Navigate } from "react-router-dom";
import { useUserContext } from "src/contexts/user/user.context";
import SignupHeader from "src/components/signup/header";
import SignupForm from "src/components/signup/form";
import Modal from "src/components/common/modal";
import './signup.scss';

export default function Signup() {
    const { isUserLogged } = useUserContext();
    if (isUserLogged) return <Navigate to="/" />;
    
    return (
        <div className="sign-up-page">
            <Modal>
                <SignupHeader />
                <SignupForm />
            </Modal>
        </div>
    )
}