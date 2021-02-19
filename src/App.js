import React, {useState, useEffect} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";


const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"https://peaceful-cray-63e5dd.netlify.app/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                    )}

                    {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"https://peaceful-cray-63e5dd.netlify.app/mod"} className="nav-link">
                                Moderator Board
                            </Link>
                        </li>
                    )}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"https://peaceful-cray-63e5dd.netlify.app/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"https://peaceful-cray-63e5dd.netlify.app/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="https://peaceful-cray-63e5dd.netlify.app/" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"https://peaceful-cray-63e5dd.netlify.app/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"https://peaceful-cray-63e5dd.netlify.app/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path="https://peaceful-cray-63e5dd.netlify.app/home" component={Home}/>
                    <Route exact path="https://peaceful-cray-63e5dd.netlify.app/login" component={Login}/>
                    <Route exact path="https://peaceful-cray-63e5dd.netlify.app/register" component={Register}/>
                    <Route exact path="https://peaceful-cray-63e5dd.netlify.app/profile" component={Profile}/>
                    <Route path="https://peaceful-cray-63e5dd.netlify.app/user" component={BoardUser}/>
                </Switch>
            </div>
        </>
    );
};

export default App;