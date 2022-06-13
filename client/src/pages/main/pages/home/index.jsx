import { useNavigate } from 'react-router-dom';
import { useLoggedUser } from 'hooks';

// Icons
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EventIcon from '@mui/icons-material/Event';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import Ilustration1 from './assets/images/ilustration-1-home.svg';
import Ilustration2 from './assets/images/ilustration-2-home.svg';

import './assets/sass/home.scss';


const Home = () => {
    const { loggedUser } = useLoggedUser();
    const navigateTo = useNavigate();


    return (
        <main className="home-page">
            <section className="welcome-section">
                <div className="title">
                    <DiamondRoundedIcon className="logo" />
                    <h2>
                        CoursesLive!
                    </h2>
                </div>
                

                <p>
                    We are a platform that for free shares through
                    online courses the knowledge you need to become
                    the Full Stack developer you always wanted to be!
                </p>

                {
                    loggedUser.isLogged ?
                    <button
                     className="button" 
                     onClick={() => navigateTo('courses')}
                    >
                        Let's Learn!
                    </button>
                    :
                    <button 
                     className="button button-black"
                     onClick={() => navigateTo('signup')}
                    >
                        Sign up for free!
                    </button>
                }

                <img 
                 src={Ilustration1} 
                 alt=""
                 className="ilustration ilustration-one"
                />

                <img
                 src={Ilustration2}
                 alt=""
                 className="ilustration ilustration-two"
                />
            </section>

            <section className="promotion-section">
                <h3>Who are we?</h3>
                <p>
                    We are a non-profit company that seeks through the most didactic 
                    ways possible to share clear and quality knowledge
                </p>

                <div className="advantages">
                    <h4>Some of the advantages offered by CoursesLive:</h4>
                    <ul className="advantages-list">
                        <li>
                            <PsychologyIcon className="icon" />

                            <p>    
                                CoursesLive offers you quality knowledge obtained from the best 
                                known programmers in the industry. CoursesLive courses are made 
                                by programmers who today work at FAANG!
                            </p>
                        </li>

                        <li>
                            <EventIcon className="icon" />

                            <p>
                                We offer you a strict schedule so you can fit your day to day to 
                                your learning process with usyour day to day to your learning process with us.
                            </p>
                        </li>

                        <li>
                            <MoneyOffIcon className="icon" />

                            <p>
                                And best of all, we give you all these advantages at a modest price of $0, 
                                think about it, the best knowledge of the best in the industry for $0!
                            </p>
                        </li>
                    </ul>
                </div>

            </section>
        </main>
    )
}

export default Home;