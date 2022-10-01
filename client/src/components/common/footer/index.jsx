import Credits from './components/Credits';
import FooterSections from './components/Sections';
import SocialMedia from './components/SocialMedia';
import Copyright from './components/Copyright';
import './footer.scss';

export default
function Footer() {

    return (
        <footer className="main-footer">
            <div className="main-information">
                <Credits />
                <FooterSections />
                <SocialMedia />
            </div>

            <div className="copy-section">
                <Copyright />
            </div>
        </footer>
    )
}