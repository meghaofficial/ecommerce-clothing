import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import wishlistReducer from './wishlistSlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        allWishlist: wishlistReducer,
        allProducts: productReducer
    }
});

export default store;