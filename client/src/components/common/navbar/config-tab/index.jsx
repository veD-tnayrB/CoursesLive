import { useUserContext } from "src/contexts/user/user.context";
import { useNavigate } from "react-router-dom";
import Card from "src/components/common/card";

export default function UserConfigTab() {
    const { logout } = useUserContext();
    const navigateTo = useNavigate();

    function handleLogout() {
        logout();
        navigateTo('/');
    }

    return (
        <Card>
            <ul className="options-list">
                <li>
                    <button>
                        Settings
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </Card>
    )
}