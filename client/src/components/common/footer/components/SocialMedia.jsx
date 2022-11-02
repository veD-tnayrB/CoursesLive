import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SocialMedia() {

    return (
        <div className="social-media">
            <h5>Follow us!</h5>

            <div className="icons">
                <TwitterIcon className="icon" />
                <GitHubIcon className="icon" />
            </div>
        </div>
    )
}