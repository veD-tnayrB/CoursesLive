import * as React from 'react';

export const CreateTestContext = React.createContext();
export const useCreateTextContext = () => React.useContext(CreateTestContext);
