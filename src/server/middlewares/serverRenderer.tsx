import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import HTML from "../components/HTML";
import App from "../../shared/App";

const serverRenderer = (_req, res) => {
  const scripts = [{ src: res.locals.assetPath("bundle.js") }];
  const css = [{ href: res.locals.assetPath("bundle.css") }];

  const app = renderToString(
    <Provider store={res.locals.store}>
      <App />
    </Provider>
  );

  const state = JSON.stringify(res.locals.store.getState());
  return res.send(
    "<!doctype html>" +
      renderToString(
        <HTML scripts={scripts} css={css} state={state}>
          {app}
        </HTML>
      )
  );
};

export default serverRenderer;
