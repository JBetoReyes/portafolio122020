import React from "react";

const About = () => {
  return (
    <div className="main-section">
      <div className="main-section__container">
        <div className="about-wrapper">
          <div className="about-me">
            <h4>MORE ABOUT ME</h4>
            <p>
              Hi, I’m José. I’m 27 years old, multi-disciplinary and latin
              american, MX. I’m mostly using React and Node to build websites
              and web-based applications for different kind of clients.
            </p>
            <p>
              When I’m not <s>in the office</s> working remotely I can be found
              eating tacos, reading sci-fi, playing video games, learning new
              skills, and occasionally, writing about some of that here.
            </p>
            <h4>TOP EXPERTISES</h4>
            <div id="skills">
              <ul>
                <li>JS</li>
                <li>NodeJS</li>
                <li>ReactJS</li>
                <li>Angular</li>
                <li>Typescript</li>
                <li>HTML/CSS</li>
              </ul>
              <ul>
                <li>Mongo DB</li>
                <li>Docker</li>
                <li>Postgres</li>
                <li>AWS Lambdas</li>
                <li>EC2</li>
              </ul>
            </div>
          </div>
          <div className="social-links">
            <h4>FIND ME ON LINKEDIN AND TWITTER</h4>
            <a href="https://www.linkedin.com/in/josealbertoquevedo/">
              Linkedin
            </a>
            <br />
            <a href="https://twitter.com/Jose83550863">Twitter</a>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
