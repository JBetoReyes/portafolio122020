import React from 'react';
import { renderToString } from 'react-dom/server';
import HTML from '../components/HTML';
import App from '../../shared/App';

const serverRenderer = (req, res) => {
    const scripts = [
      { src: res.locals.assetPath('bundle.js') }
    ];
    const css = [
      { href: res.locals.assetPath('bundle.css')}
    ];
    return res.send(
        '<!doctype html>' +
            renderToString(
                <HTML
                  scripts={scripts}
                  css={css}
                >
                    <App />
                </HTML>
            )
    );
}; 

export default serverRenderer;
