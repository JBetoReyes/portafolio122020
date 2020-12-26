import React from 'react';

type ScriptTag = {
  src: string;
};

type LinkTag = {
  href: string;
};

type Props = {
    children: React.ReactNode,
    scripts: ScriptTag[],
    css: LinkTag[],
};

const HTML = ({ children, scripts = [], css = [] }: Props): JSX.Element => {
    return (
        <html>
            <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              {css.filter(Boolean).map(({href}) => (
                <link key={href} rel="stylesheet" href={href} />
            ))}
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
