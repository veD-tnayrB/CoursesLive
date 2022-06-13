import React from 'react';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';

import './footer.scss';

const Footer = () => {    

    return (
        <footer className="footer">
                <span>
                    All Rights Reserved ®
                </span>

                <span className="logo-container">
                    <DiamondRoundedIcon className="logo" />
                    CoursesLive
                </span>
        </footer>
    )
}

export default Footer;