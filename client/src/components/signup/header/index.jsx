import Logo from "src/components/common/logo";
import './header.scss';

export default function SignupHeader() {

    return (
        <header className="sign-up-header">
            <Logo />
            <p>
                Sign up for 
                the complete information to our courses and academic plans!
            </p>
        </header>
    )
}