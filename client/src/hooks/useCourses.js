import { useContext } from 'react';
import { CoursesContext } from 'contexts/courses';

export const useCourses = () => {
    const { coursesList, setCoursesList } = useContext(CoursesContext);
    return { coursesList, setCoursesList };
}