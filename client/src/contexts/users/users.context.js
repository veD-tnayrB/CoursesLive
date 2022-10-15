import * as React from 'react';

export const UsersContext = React.createContext();
export const useUsersContext = () => React.useContext(UsersContext);