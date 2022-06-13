import { Outlet } from 'react-router-dom';

import UserCard from 'pages/main/components/userCard';

import { useLoggedUser, useUsers } from 'hooks';

import Ilustration1 from './assets/images/ilustration-1-students.svg';
import Ilustration2 from './assets/images/ilustration-2-students.svg';
import Ilustration3 from './assets/images/ilustration-3-students.svg';

import './assets/sass/student.scss';


const Student = () => {    
    const { usersList } = useUsers();
    const { loggedUser } = useLoggedUser();


    const studentElement = usersList.map(user => (
        <UserCard
         key={user.mail}
         user={user}
         loggedUser={loggedUser}
        />
    ))

    
    return (
        <main className="student-page page">
            <div className="title-decoration">
                <h2>Students</h2>

                <img 
                 className="ilustration ilustration-one"
                 alt=""
                 src={Ilustration1}
                />

                <img 
                 className="ilustration ilustration-two"
                 alt=""
                 src={Ilustration2}
                />

                <img 
                 className="ilustration ilustration-three"
                 alt=""
                 src={Ilustration3}
                />
                
            </div>

            <section>
                <ul className="items-list">
                    {studentElement}
                </ul>
            </section>

            <Outlet />
        </main>
    )
}

export default Student;