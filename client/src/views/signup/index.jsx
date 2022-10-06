import { Navigate } from "react-router-dom";
import { useUserContext } from "src/contexts/user.context";
import SignupHeader from "src/components/signup/header";
import SignupForm from "src/components/signup/form";
import './signup.scss';

export default function Signup() {
    const { isUserLogged } = useUserContext();
    if (isUserLogged) return <Navigate to="/" />;
    
    return (
        <div className="sign-up-page">
            <section>
                <SignupHeader />
                <SignupForm />
            </section>
        </div>
    )
}