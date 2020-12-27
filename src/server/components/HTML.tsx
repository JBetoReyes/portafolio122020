import React from "react";

type ScriptTag = {
  src: string;
};

type LinkTag = {
  href: string;
};

type Props = {
  children: string;
  scripts: ScriptTag[];
  css: LinkTag[];
  state: string;
};

const HTML = ({
  children,
  scripts = [],
  css = [],
  state = "{}",
}: Props): JSX.Element => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {css.filter(Boolean).map(({ href }) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <title>Jose Quevedo</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`,
          }}
        />
      </head>
      <body>
        <div
          id="app"
          dangerouslySetInnerHTML={{
            __html: children,
          }}
        ></div>
        {scripts.filter(Boolean).map(({ src }) => {
          return <script key={src} src={src} />;
        })}
      </body>
    </html>
  );
};

export default HTML;
