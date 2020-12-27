import React from 'react';
import IntroSection from './components/IntroSection';
import About from './components/About';
import Projects from './components/Projects';
import { IStoreState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';

const mapToState = (state: IStoreState) => {
    return {
        theme: state.theme
    }
}

const connection = connect(mapToState);

type PropsFromRedux = ConnectedProps<typeof connection>;

type Props = PropsFromRedux;

const Home = ({
    theme
}: Props): JSX.Element => {
    return (
        <div className={`theme-${theme}`}>
            <IntroSection />
            <About />
            <Projects />
        </div>
    );
}

export default connection(Home);