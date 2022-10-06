import * as React from 'react';
import { useUserContext } from "src/contexts/user.context";
import { ENVIRONMENT } from "src/services/config";
import UserConfigTab from './config-tab';

export default function User() {
    const { user } = useUserContext();
    const [showConfig, setShowConfig] = React.useState(false);
    console.log(3, `${ENVIRONMENT}${user.profileImage}`)

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
                src={`${ENVIRONMENT}${user.profileImage}`}
                alt="user"
            />

            {
                showConfig &&
                <UserConfigTab />
            }
        </div> 
    )
}