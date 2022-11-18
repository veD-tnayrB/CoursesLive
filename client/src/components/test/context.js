import * as React from 'react';

export const TestContext = React.createContext();
export const useTestContext = () => React.useContext(TestContext);
