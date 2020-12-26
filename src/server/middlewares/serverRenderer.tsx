import React from 'react';
import { renderToString } from 'react-dom/server';
import HTML from '../components/HTML';
import Home from '../../shared/pages/Home';

const serverRenderer = (req, res) => {
    console.log(res.locals.assetPath('bundle.js'));
    return res.send(
        '<!doctype html>' +
            renderToString(
                <HTML>
                    <Home />
                </HTML>
            )
    );
}; 

export default serverRenderer;
