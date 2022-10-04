import SignupHeader from "src/components/signup/header";
import SignupForm from "src/components/signup/form";
import './signup.scss';

export default function Signup() {

    
    return (
        <div className="sign-up-page">
            <section>
                <SignupHeader />
                <SignupForm />
            </section>
        </div>
    )
}