import { createContext, useState, useEffect } from 'react';
const CoursesContext = createContext();


const CoursesProvider = ({ children }) => {
    const [coursesList, setCoursesList] = useState(JSON.parse(localStorage.getItem('courses')) || []);


    // Save every change on LocalStorage
    useEffect(() => {
        localStorage.setItem('courses', JSON.stringify(coursesList));

    }, [coursesList])

    
    return (
        <CoursesContext.Provider value={{ coursesList, setCoursesList }}>
            { children }
        </CoursesContext.Provider>
    )
}

export { CoursesContext, CoursesProvider };