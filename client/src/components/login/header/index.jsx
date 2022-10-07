import Logo from 'src/components/common/logo';
import './header.scss';

export default function LoginHeader() {

    return (
        <header className="login-header">
            <Logo />
            <p>
                Login to continue enjoying the benefits we offer you!
            </p>
        </header>
    )
}