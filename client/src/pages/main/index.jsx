import { Outlet } from 'react-router-dom';

import Navbar from 'pages/main/components/navbar';
import Footer from 'pages/main/components/footer';

import { useTab } from 'hooks';

import './assets/sass/main.scss';


const Main = () => {
    const { toggleIsTabOpen } = useTab();

    return (
        <div onClick={toggleIsTabOpen}>
            <Navbar />
            <div className="body">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Main;