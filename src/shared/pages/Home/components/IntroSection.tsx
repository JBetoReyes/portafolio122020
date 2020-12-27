import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import profile from  '../../../assets/profile-default.png';
import { changeTheme } from '../../../store/actions/themeActions';

const mapDispatch = {
    changeTheme: changeTheme
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const IntroSection = (props: Props) => {
    const handleChangeTheme = (theme: string) => {
        return () => {
            props.changeTheme(theme);
        };
    };
    return (
        <div className="main-section">
            <div className="main-section__container">
                <div className="intro-section__container">
                    <div className="greet-wrapper">
                        <h1 className="greet-wrapper__greet">
                            Hello, I&apos;m Jose Quevedo
                        </h1>
                    </div>
                    <div className="mac-window">
                        <div className="mac-window__header">
                            <div className="mac-window__buttons">
                                <div className="mac-window__button" />
                                <div className="mac-window__button" />
                                <div className="mac-window__button" />
                            </div>
                        </div>
                        <div className="left-wrapper">
                            <div className="left-wrapper__profile-wrapper">
                            <img
                                className="left-wrapper__profile-wrapper--img"
                                src={profile}
                                alt="profileimage"
                            />
                            </div>
                            <div className="left-wrapper__theme-wrapper">
                                <h4 className="left-wrapper__theme-title">Personalize theme</h4>
                                <div className="left-wrapper__theme-dots">
                                    <div
                                    className="left-wrapper__theme-dot left-wrapper__theme-dot-light-mode"
                                    onClick={handleChangeTheme('default')}
                                    role="menuitem"
                                    />
                                    <div
                                    className="left-wrapper__theme-dot"
                                    onClick={handleChangeTheme('dark')}
                                    role="menuitem"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="right-wrapper">
                        <div className="right-wrapper__about-wrapper">
                            <div className="right-wrapper__about-wrapper--shadow">
                                <div className="right-wrapper__about-wrapper--corner" />
                                <div className="right-wrapper__about-wrapper--corner" />
                                <div className="right-wrapper__about-wrapper--corner" />
                                <div className="right-wrapper__about-wrapper--corner" />
                                <h3>What I Do?</h3>
                                <p className="right-wrapper__about-content">
                                I&apos;m a multidisciplinary developer specialized in{' '}
                                <strong>NodeJS</strong>, <strong>Angular</strong> and{' '}
                                <strong>ReactJS</strong>
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connector(IntroSection);