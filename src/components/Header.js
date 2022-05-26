import React from 'react';
import { NavLink, useHistory, Switch, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    const { loggedIn } = props;
    const history = useHistory();

    function signOut() {
        props.onLogOut();
        localStorage.removeItem('token');
        history.push('/signin');
    }


    if (!loggedIn) {
        return (
            <div className="header">
                <img className="logo" src={logo} alt="Around The US logo" />
                <nav>
                    <Switch>
                        <Route path="/signin">
                            <NavLink to="/signup" className="button header__button">Sign up</NavLink>
                        </Route>
                        <Route path="/signup">
                            <NavLink to="/signin" className="button header__button">Log in</NavLink>
                        </Route>
                    </Switch>
                </nav>
            </div>
        )
    } else {
        return (
            <div className="header">
                <img className="logo" src={logo} alt="Around The US logo" />
                <nav className="header__nav-wrapper">
                    <h3 className="header__email">{props.userData.email}</h3>
                    <button onClick={signOut} className="button header__button">Log out</button>
                </nav>
            </div>
        )
    }
}

export default Header