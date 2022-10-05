import * as React from 'react';

export const UserContext = React.createContext();
export const useUserContext = () => React.useContext(UserContext);

export default
function UserContextProvider({ children }) {
    const [user, setUser] = React.useState({});
    const isUserLogged = user;

    return (
        <UserContext.Provider value={{user, setUser, isUserLogged}}>
            {children}
        </UserContext.Provider>
    )
}