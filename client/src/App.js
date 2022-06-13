import { useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Data base
import { Users, Courses  } from 'services/db';

import ProtectedRoutes from 'components/protectedRoutes';
import { CoursesContext } from 'contexts/courses';  
import { UsersContext } from 'contexts/users';  

// Register/Login pages
import Register from 'pages/main/pages/register';
import Login from 'pages/main/pages/login';

// Main pages
import Main from 'pages/main';
import Home from 'pages/main/pages/home';

// Course pages
import Course from 'pages/main/pages/course';
import NewCourse from 'pages/main/pages/course/pages/newCourse';
import SuscribeCourse from 'pages/main/pages/course/pages/suscribeCourse';
import UnsuscribeCourse from 'pages/main/pages/course/pages/unsuscribeCourse';
import ModifyCourse from 'pages/main/pages/course/pages/modifyCourse';
import DeleteCourse from 'pages/main/pages/course/pages/deleteCourse';

// Episodes
import Episodes from 'pages/main/pages/episodes';
import WhatchEpisode from 'pages/main/pages/episodes/pages/watchEpisode';
import NewEpisode from 'pages/main/pages/episodes/pages/newEpisode';
import DeleteEpisode from 'pages/main/pages/episodes/pages/deleteEpisode';
import ModifyEpisode from 'pages/main/pages/episodes/pages/modifyEpisode';

// Student pages
import Student from 'pages/main/pages/student';
import DeleteStudent from 'pages/main/pages/student/pages/deleteStudent';
import PromoteStudent from 'pages/main/pages/student/pages/promoteStudent';
import DelegateStudent from 'pages/main/pages/student/pages/delegateStudent';

// Settings
import Settings from 'pages/main/pages/settings';

import 'assets/sass/app.scss';


const App = () => {
    const { setCoursesList } = useContext(CoursesContext);
    const { setUsersList } = useContext(UsersContext);
    
    
    /*
        Get the data from data base and save it in the their context for be used
        (When the context get the data save it on LocalStorage)
    */
    useEffect(() => {
        const isCoursesAlreadyCreated = localStorage.getItem('courses') !== null;
        const isUsersAlreadyCreated = localStorage.getItem('users') !== null;


        if (!isCoursesAlreadyCreated) {
            const courses = new Courses();
            setCoursesList(courses.items);
        }

        if (!isUsersAlreadyCreated) {
            const users = new Users();
            setUsersList(users.items);
        }
        
    }, [])

    
    return (
        <Routes>
            
            <Route path="/" element={<Main />}>
                <Route path="" element={<Home />} />

                {/* Login */}
                <Route path="signup" element={<Register />} />
                <Route path="login" element={<Login />} />

                {/* Courses */}
                <Route path="courses/" element={<Course />}>
                    <Route path="suscribe/:courseId" element={<SuscribeCourse />} />
                    <Route path="unsuscribe/:courseId" element={<UnsuscribeCourse />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="new" element={<NewCourse />} />
                        <Route path="settings/:courseId" element={<ModifyCourse />} />
                        <Route path="delete/:courseId" element={<DeleteCourse />} />
                    </Route>
                </Route>

                {/* Course Episodes */}
                <Route path="course/:courseId/episodes" element={<Episodes />}>
                    <Route path="watch/:episodeId" element={<WhatchEpisode />} />

                    <Route element={<ProtectedRoutes />}>
                        <Route path="new" element={<NewEpisode />} />
                        <Route path="delete/:episodeId" element={<DeleteEpisode />} />
                        <Route path="settings/:episodeId" element={<ModifyEpisode />} />
                    </Route>
                </Route>

                {/* Students */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="students" element={<Student />}>
                        <Route path="delete/:mail" element={<DeleteStudent />} />
                        <Route path="promote/:mail" element={<PromoteStudent />} />
                        <Route path="delegate/:mail" element={<DelegateStudent />} />
                    </Route>
                </Route>

                {/* Settings */}
                <Route path="setting/student/:mail" element={<Settings />} />
            
                <Route path="*" element={<Navigate to="/" />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
