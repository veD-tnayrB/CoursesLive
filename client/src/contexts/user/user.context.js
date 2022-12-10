import * as React from 'react';

export const UserContext = React.createContext();
export const useUserContext = () => React.useContext(UserContext);
