import configureStore from "../../shared/store";

const addStore = (req, res, next) => {
  const { theme } = req.query;
  res.locals.store = configureStore({
    initialState: {
      theme,
    },
  });
  next();
};

export default addStore;
