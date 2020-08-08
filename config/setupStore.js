import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import AsyncStorage from "@react-native-community/async-storage";

import rootReducer from "../reducers";

const logger = createLogger();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);
export const persistor = persistStore(store);
