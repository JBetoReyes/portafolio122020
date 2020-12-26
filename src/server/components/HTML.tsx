import React from 'react';

type Props = {
    children: React.ReactNode
};

const HTML = ({ children }: Props): JSX.Element => {
    return (
        <html>
            <head>
                <title>Jose Reyes</title>
            </head>
            <body>
                <div id="app">{children}</div>
            </body>
        </html>
    )
};

export default HTML;