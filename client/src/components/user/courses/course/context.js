import * as React from 'react';

export const CourseItemContext = React.createContext();
export const useCourseItemContext = () => React.useContext(CourseItemContext);