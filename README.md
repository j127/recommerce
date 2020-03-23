# React Ecommerce Site

An ecommerce site in React based on [this tutorial](https://www.udemy.com/course/complete-react-developer-zero-to-mastery/) (with changes).

## Notes

### Using Sass with `create-react-app`

If you `npm i -D node-sass`, `create-react-app` will know how to handle it. All you have to do is install the package.

### Firestore Queries

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
