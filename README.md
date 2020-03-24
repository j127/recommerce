# React Ecommerce Site

An ecommerce site in React based on [this tutorial](https://www.udemy.com/course/complete-react-developer-zero-to-mastery/) (with changes).

## Notes

These notes are incomplete and there may be typos or other errors.

### Using Sass with `create-react-app`

If you `npm i -D node-sass`, `create-react-app` will know how to handle it. All you have to do is install the package.

### Firestore Queries

Firestore will give you one of two types of objects: references (locations) and snapshots (data). Either can be in the forum of a Document or Collection.

A reference doesn't hold the actual data, but you use it for CRUD operations (`.set()`, `.get()`, `.update()`, and `.delete()`) and to add documents to collections (`.add({ value: "prop" })`).

To get snapshots: `referenceObject.get()`.

`documentRef.get()` returns a document snapshot object.

`collectionRef.get()` returns a query snapshot object.

To access references:

```javascript
firestore
    .collection("users")
    .doc("someId")
    .collection("cartItems")
    .doc("anotherId");
```

Alternate syntax:

```javascript
firestore
    .doc("/users/someId/cartItems/anotherId");
```

## Redux

### Flux Pattern

```text
Action → Dispatcher → Store → View
```

### Terms

A reducer is a slice of state. For example, a User Reducer or a Shop Reducer. (Reducers are functions that take `(currentState, action)` and return a new object: `{...currentState, someKeyToUpdate: action.payload}`.) They combine into one big object called the Root Reducer. The state can get passed into components as props. You can put middleware in between the actions and the reducers.

The unidirectional cycle of data flow:

- Root Reducer passes state as props to components.
- Components use actions to update reducers (slices of state).
- The reducers are part of the Root Reducer.

### Install

```text
$ npm i -S redux redux-logger react-redux
```

Wrap everything in the `Provider` component in your `index.js` file:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <Provider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
```

Redux code can go in `./src/redux/`.

### `connect` HOC

```javascript
// snip ...
import { connect } from "react-redux";

const Header = ({ currentUser }) => (
    // snip ...
);

// extract the `currentUser` out of the state
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

// `connect` is a HOC that takes `(mapStateToProps,
// mapDispatchToProps)`, and returns a function that takes a component
// and returns a modified component. Either mapping function can be
// omitted.
export default connect(mapStateToProps)(Header);
```
