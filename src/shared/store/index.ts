import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./reducers";

export interface IStoreState {
  theme?: string;
}

type StoreParams = {
  initialState?: IStoreState;
  middleware?: any[];
};

const configureStore = ({ initialState, middleware = [] }: StoreParams) => {
  let appInitialState = initialState;
  if (typeof window !== "undefined") {
    const localState = JSON.parse(localStorage.getItem("appState"));
    appInitialState = {
      ...initialState,
      ...localState,
    };
  }
  const composeEnhancers =
    (typeof window !== "undefined" &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(
    createRootReducer(),
    appInitialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
  );

  if (typeof window !== "undefined") {
    store.subscribe(() => {
      const storeState = store.getState();
      const { theme } = storeState;
      const stringifyState = JSON.stringify(storeState);
      localStorage.setItem("appState", stringifyState);
      window.history.replaceState(null, null, `?theme=${theme}`);
    });
  }

  if (process.env.NODE_ENV !== "production" && (module as any).hot) {
    (module as any).hot.accept("./reducers", () =>
      store.replaceReducer(createRootReducer())
    );
  }
  return store;
};

export default configureStore;
