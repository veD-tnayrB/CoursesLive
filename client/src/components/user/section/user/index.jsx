import { useUserContext } from "src/contexts/user/user.context";
import Card from "src/components/common/card";
import UserActions from './actions';
import { Link } from "react-router-dom";

const TEMPORAL_CREATOR_IMG = 'data:image/jpeg;base64,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';

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
                    src={user.profileImage || TEMPORAL_CREATOR_IMG} 
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