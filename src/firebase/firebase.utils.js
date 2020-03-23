import firebase from "firebase/app";
// firebase will attach the imports below to `firebase` mentioned above
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCJFsYVD0t6IyT0xLR_i0OWuHKG9U6WrcU",
    authDomain: "recommerce-d6192.firebaseapp.com",
    databaseURL: "https://recommerce-d6192.firebaseio.com",
    projectId: "recommerce-d6192",
    storageBucket: "recommerce-d6192.appspot.com",
    messagingSenderId: "315510535899",
    appId: "1:315510535899:web:240a836812318d933f7efe",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    // if there isn't a user there in firestore, create it
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
            console.log("yes");
        } catch (err) {
            console.log("error creating user", err.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
