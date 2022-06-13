import { NavLink, useNavigate } from 'react-router-dom';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

import { useLoggedUser, useUsers, useTab } from 'hooks';

import './navbar.scss';


const Navbar = () => {
    const { loggedUser } = useLoggedUser();;
    const { setUsersList } = useUsers();
    const { isTabOpen, toggleIsTabOpen } = useTab();
    const navigateTo = useNavigate();

    const logout = () => {
        setUsersList(prevUsers => (
            prevUsers.map(user => {
                if (user.mail === loggedUser.mail) {
                    return {
                        ...user,
                        isLogged: false
                    }
                }

                return user;
            })
        ))

        navigateTo('/', { replace: true })
    }

    
    return (
        <nav>
            <ul>
                <div className="logo-container">
                    <DiamondRoundedIcon className="logo" />
                    <h1>CoursesLive</h1>
                </div>

                <div className="right-section">
                    <div className="options-list">
                        <li>
                            <NavLink
                             className="option"
                             to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                             className="option"
                             to="courses"
                            >
                                Courses
                            </NavLink>
                        </li>
                        {
                            loggedUser.role === 'admin' &&
                            <li>
                                <NavLink
                                 className="option"
                                 to="students"
                                >
                                    Students
                                </NavLink>
                            </li>
                        }
                    </div>

                    <div className="user-container">

                        <button
                         className="profile-button"
                         onClick={toggleIsTabOpen}
                         title="profile"
                        >
                            {
                                loggedUser.isLogged ?
                                    <AccountCircleIcon className="profile-icon" />
                                    :
                                    <NoAccountsIcon className="profile-icon" />
                            }
                        </button>

                        {
                            isTabOpen &&
                            <article className="tab">
                                {
                                    loggedUser.isLogged ?
                                        <>
                                            <AccountCircleIcon className="profile-icon" />
                                            <h4>{loggedUser.name} {loggedUser.lastName}</h4>
                                            <p>{loggedUser.mail}</p>

                                            <button 
                                             className="button button-blue" 
                                             onClick={() => navigateTo(`setting/student/${loggedUser.mail}`)}
                                            >
                                                <SettingsIcon className="logo" />
                                                Settings
                                            </button>

                                            <button 
                                             className="button button-red log-out-button" 
                                             onClick={logout}
                                            >
                                                <LogoutRoundedIcon className="logo" />
                                                Logout
                                            </button>
                                        </>
                                        :
                                        <>
                                            <NoAccountsIcon className="profile-icon" />
                                            <button 
                                             className="button button-green"
                                             onClick={() => navigateTo('signup')}
                                            >
                                                <ExitToAppRoundedIcon className="logo" />
                                                Sign Up
                                            </button>

                                            <button 
                                             className="button button-blue"
                                             onClick={() => navigateTo('login')}
                                            >
                                                <VpnKeyRoundedIcon className="logo" />
                                                Log in
                                            </button>
                                        </>
                                }
                            </article>
                        }
                    </div>    
                </div>            
            </ul>
        </nav>
    )
}

export default Navbar;