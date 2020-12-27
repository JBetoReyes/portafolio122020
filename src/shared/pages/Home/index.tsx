import React from 'react';
import IntroSection from './components/IntroSection';
import About from './components/About';
import Projects from './components/Projects';

const Home = (): JSX.Element => {
    return (
        <div className="theme-default">
            <IntroSection />
            <About />
            <Projects />
        </div>
    );
}

export default Home;