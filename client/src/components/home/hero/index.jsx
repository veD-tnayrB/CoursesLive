import Header from 'src/components/common/header';
import './hero.scss';

function Hero() {

    return (
        <Header>
            <h2>Become what you want!</h2>
            <p>With our tools you can become the best version of you, learn with out courses and review your knowledge with out test, be part of our team!</p>
            <button className="primary-button">
                Let's start
            </button>
        </Header>
    )
}

export default Hero;