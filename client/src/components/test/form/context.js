import * as React from 'react';

export const TestFormContext = React.createContext();
export const useTestFormContext = () => React.useContext(TestFormContext);
