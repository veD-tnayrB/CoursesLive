import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoggedUser } from 'contexts/loggedUser';

const ProtectedRoutes = () => {
    const { loggedUser } = useContext(LoggedUser);

    return (
        <div>
            {
                loggedUser.role === 'admin' ?
                <Outlet /> 
                :
                <Navigate to="/" />
            }
        </div>
    )
}

export default ProtectedRoutes;