import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// This tells it to use localStorage as the default storage (instead of
// session storage).
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

const persistConfig = {
    key: "root",
    storage, // use localStorage, see above
    whitelist: ["cart"], // a list of reducers to persist
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
