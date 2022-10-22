import * as React from 'react';

export const CourseContext = React.createContext();
export const useCourseContext = () => React.useContext(CourseContext);