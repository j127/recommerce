import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";

import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";

const Header = ({ currentUser }) => (
    <div className="header">
        <Link to="/" className="logo-container">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                Shop
            </Link>
            <Link className="option" to="/contact">
                Contact
            </Link>

            {currentUser ? (
                <div className="option" onClick={() => auth.signOut()}>
                    Sign Out
                </div>
            ) : (
                <Link className="option" to="/signin">
                    Sign In
                </Link>
            )}
            <CartIcon />
        </div>
    </div>
);

// extract the `currentUser` out of the state
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

// `connect` is a HOC that takes a function, either `mapStateToProps` or
// `mapDispatchToProps`, and returns a function that takes a component and
// returns a modified component.
export default connect(mapStateToProps)(Header);
