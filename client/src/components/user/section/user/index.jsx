import { Link } from "react-router-dom";
import { useUserContext } from "src/contexts/user/user.context";
import Card from "src/components/common/card";
import UserActions from './actions';
import { IMAGES_ROUTES } from "src/services/config";

const COLORS_BY_ROLE = {
    student: 'blue',
    teacher: 'green',
    admin: 'red'
}

export default function User({ user }) {
    const { user: loggedUser } = useUserContext();
    const isTheLoggedUser = user.id === loggedUser.id;
    const roleClass = COLORS_BY_ROLE[user.role];

    return (
        <Card>
            <header>
                <div className="info-container">
                    <div className="title-container">
                        <h3 title={`${user.name} ${user.lastName}`}>
                            {user.name} {user.lastName}
                        </h3>
                    </div>
                    <span className={roleClass}>{user.role}</span>
                </div>

                <img 
                    alt={`${user.name} profile`}
                    src={`${IMAGES_ROUTES}${user.profileImage}`} 
                    title={user.mail}
                />
            </header>
            <div className="actions-container">
                {
                    !isTheLoggedUser &&
                    <UserActions user={user} />
                }

                <div className="end-button">
                    <Link to={`/users/user/${user.id}`} className="default-button">
                        See profile
                    </Link>
                </div>
            </div>
        </Card>
    )
}