import { createSlice } from "@reduxjs/toolkit"

const initialState = {
      allWishlist: []
}

const wishlistSlice = createSlice({
      name: "allWishlist",
      initialState,
      reducers: {
            setAllWishlist: (state, action) => {
                  state.allWishlist = action.payload
            }
      }
});

export const { setAllWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;