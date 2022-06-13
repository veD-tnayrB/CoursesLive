import { useContext } from 'react';
import { LoggedUser } from 'contexts/loggedUser';

export const useLoggedUser = () => {
    const { loggedUser, setLoggedUser } = useContext(LoggedUser);
    return { loggedUser, setLoggedUser };
}