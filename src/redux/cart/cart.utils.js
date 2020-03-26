export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(
            cartItem =>
                cartItem.id === cartItemToAdd.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 } // returning a new object causes React to rerender
                    : cartItem // returning the same item doesn't cause rerender
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
