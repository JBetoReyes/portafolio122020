import * as React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import App from "../shared/App";
import configureStore, { IStoreState } from "../shared/store";

type ComposeWindow = typeof window & {
  store: ReturnType<typeof configureStore>;
  __PRELOADED_STATE__: IStoreState;
};

const store =
  (window as ComposeWindow).store ||
  configureStore({
    initialState: (window as ComposeWindow).__PRELOADED_STATE__ || {},
  });

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "development") {
  if ((module as any).hot) {
    (module as any).hot.accept();
  }

  if (!(window as ComposeWindow).store) {
    (window as ComposeWindow).store = store;
  }
}
