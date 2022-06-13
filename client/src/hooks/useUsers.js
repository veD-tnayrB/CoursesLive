import { useContext } from 'react';  
import { UsersContext } from 'contexts/users';

export const useUsers = () => {
    const { usersList, setUsersList } = useContext(UsersContext);
    return { usersList, setUsersList };
}