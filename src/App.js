import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
        };
    }

    // Close the firebase auth connection when done to prevent memory
    // leaks. See the lifecycle methods below.
    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            // if the user is logged in
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                // subscribe to changes
                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        },
                    });
                });
            }

            // else the userAuth is null if it gets to here
            this.setState({ currentUser: userAuth });
            // createUserProfileDocument(user);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/signin" component={SignInAndSignUpPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
