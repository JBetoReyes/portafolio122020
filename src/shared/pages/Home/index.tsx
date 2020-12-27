import React from 'react';
import IntroSection from './components/IntroSection';
import About from './components/About';

const Home = (): JSX.Element => {
    return (
        <div className="theme-default">
            <IntroSection />
            <About />
        </div>
    );
}

export default Home;