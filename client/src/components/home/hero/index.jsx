import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from 'src/contexts/user/user.context';
import Header from 'src/components/common/header';
import './hero.scss';

function Hero() {
    const { isUserLogged } = useUserContext();
    const navigateTo = useNavigate();

    function goAhead() {
        const redirectTo = isUserLogged ? '/courses' : '/signup';
        navigateTo(redirectTo);
    }

    return (
        <Header>
            <h2>Become what you want!</h2>
            <p>With our tools you can become the best version of you, learn with out courses and review your knowledge with out test, be part of our team!</p>
            
            <div className="actions-container">
                <button
                    onClick={goAhead} 
                    className="primary-button"
                >
                    Let's start
                </button>

                {
                    !isUserLogged &&
                    <Link to="/login">
                        Log in!
                    </Link>
                }
            </div>
        </Header>
    )
}

export default Hero;