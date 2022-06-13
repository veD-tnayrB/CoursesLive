import { useState, useEffect, createContext } from 'react';

const UsersContext = createContext();


const UsersProvider = ({ children }) => {
    const [usersList, setUsersList] = useState(JSON.parse(localStorage.getItem('users')) || []);

    // Save the changes on LocalStorage
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(usersList));

    }, [usersList])

    return (
        <UsersContext.Provider value={{ usersList, setUsersList }}>
            { children }
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersProvider };