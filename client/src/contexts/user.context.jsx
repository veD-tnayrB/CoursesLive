import * as React from 'react';

export const UserContext = React.createContext();
export const useUserContext = () => React.useContext(UserContext);

export default
function UserContextProvider({ children }) {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    const isUserLogged = user.name;

    React.useEffect(() => localStorage.setItem('user', JSON.stringify(user)), [user]);

    return (
        <UserContext.Provider value={{user, setUser, isUserLogged}}>
            {children}
        </UserContext.Provider>
    )
}