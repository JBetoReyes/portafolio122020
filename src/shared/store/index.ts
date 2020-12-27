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
  const composeEnhancers =
    (typeof window !== "undefined" &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
  );
  if (process.env.NODE_ENV !== "production" && (module as any).hot) {
    (module as any).hot.accept("./reducers", () =>
      store.replaceReducer(createRootReducer())
    );
  }
  return store;
};

export default configureStore;
