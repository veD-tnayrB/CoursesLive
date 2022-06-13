import { useState, useEffect, createContext } from 'react';
import { useUsers } from 'hooks';

const LoggedUser = createContext();

const defaultUser = {
        role: 'student',
        isLogged: false,
        name: '',
        mail: '',
        password: '',
        age: '',
        courses: [],
        busyDays: []
    }

const LoggedUserProvider = ({ children }) => {
    const { usersList } = useUsers();
    const [loggedUser, setLoggedUser] = useState(defaultUser);

    
    // This update the loggedUser state always when something change
    useEffect(() => {
        const loggedStudent = usersList.find(user => user.isLogged === true);
        setLoggedUser(loggedStudent || defaultUser)
    }, [usersList])

    return (
        <LoggedUser.Provider value={{ loggedUser, setLoggedUser }}>
            { children }
        </LoggedUser.Provider>
    )
}

export { LoggedUser, LoggedUserProvider }