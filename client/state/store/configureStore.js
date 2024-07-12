import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { thunk } from "redux-thunk";

import themeReducer from "../reducers/themeReducer";
import dataReducer from "../reducers/dataReducer";
import productsReducer from "../reducers/productsReducer";
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
  theme: themeReducer,
  data: dataReducer,
  products: productsReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
