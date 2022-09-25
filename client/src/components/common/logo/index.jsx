import LOGO_ICON from 'src/assets/logo.svg';
import './logo.scss';

function Logo() {

    return (
        <div className="logo-container">
            <img 
                className="logo"
                src={LOGO_ICON}
                alt="CoursesLive"
            />
            <h1>CoursesLive</h1>
        </div>
    )
}

export default Logo;