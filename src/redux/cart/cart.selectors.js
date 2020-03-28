import { createSelector } from "reselect";

// There are two types of selectors to think about:
// - input selector (doesn't use `createSelector`)
// - ouput selector (uses `createSelector`)

// gets the entire state and slices off the needed bit (the cart)
const selectCart = state => state.cart;

// This makes each selector a memoized selector. `createSelector` takes
// an array of selectors and passes each of them as arguments into the
// function that makes up the second argument. For example, you could do:
// ```
// createSelector([selectCart, selectUser], (cart, user) => ...
// ```
// which would return the output of those selectors.
export const selectCartItems = createSelector(
    [selectCart], // the array of selectors
    cart => cart.cartItems // a function that takes each selector as an arg
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
                accumulatedQuantity + cartItem.quantity,
            0
        )
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);
