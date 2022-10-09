import * as React from 'react';
import { useUserContext } from "src/contexts/user/user.context";
import { ENVIRONMENT } from "src/services/config";
import UserConfigTab from './config-tab';

export default function User() {
    const { user, isUserLogged } = useUserContext();
    const [showConfig, setShowConfig] = React.useState(false);
    const profileImg = isUserLogged ? `${ENVIRONMENT}${user.profileImage}` : 'src/assets/user/default-user.svg';
    const showConfigTab = isUserLogged && showConfig;

    function handleHover() {
        setShowConfig(currentValue => !currentValue);
    }

    return (
        <div 
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            className="user-config-wrapper"
        >
            <img 
                src={profileImg}
                alt="user"
            />

            {
                showConfigTab &&
                <UserConfigTab />
            }
        </div> 
    )
}