import * as React from 'react';

export const CoursesContext = React.createContext();
export const useCoursesContext = () => React.useContext(CoursesContext);