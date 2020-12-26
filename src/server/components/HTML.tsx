import React from 'react';

type ScriptTag = {
  src: string;
};

type Props = {
    children: React.ReactNode,
    scripts: ScriptTag[]
};

const HTML = ({ children, scripts = [] }: Props): JSX.Element => {
    return (
        <html>
            <head>
                <title>Jose Reyes</title>
            </head>
            <body>
                <div id="app">{children}</div>
                {
                  scripts.filter(Boolean).map(({ src }) => {
                    return (
                      <script key={src} src={src} />
                    );
                  })
                }
            </body>
        </html>
    )
};

export default HTML;
