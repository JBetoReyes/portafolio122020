import React from 'react';
import { renderToString } from 'react-dom/server';
import HTML from '../components/HTML';
import Home from '../../shared/pages/Home';

const serverRenderer = (req, res) => {
    console.log(res.locals.assetPath('bundle.js'));
    const scripts = [
      { src: res.locals.assetPath('bundle.js') }
    ];
    return res.send(
        '<!doctype html>' +
            renderToString(
                <HTML
                  scripts={scripts}
                >
                    <Home />
                </HTML>
            )
    );
}; 

export default serverRenderer;
