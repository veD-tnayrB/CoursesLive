import { Navigate } from "react-router-dom";
import { useUserContext } from "src/contexts/user/user.context";
import LoginHeader from "src/components/login/header";
import Modal from "src/components/common/modal";
import LoginForm from "src/components/login/form";
import './login.scss';

export default function Login() {
    const { isUserLogged } = useUserContext();
    if (isUserLogged) return <Navigate to="/" />

    return (
        <div className="login-page">
            <Modal close={false}>
                <LoginHeader />
                <LoginForm />
            </Modal>
        </div>
    )
}