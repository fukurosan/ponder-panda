import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext"

export default class Navbar extends React.Component {

    render() {
        return (
            <UserContext.Consumer>
                {(UserContext) => (
                    <NavbarInner userContext={UserContext} {...this.props} />
                )}
            </UserContext.Consumer>
        )
    }
}

class NavbarInner extends Component {

    getLoggedInContent() {
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item navigation-item">
                    <NavLink exact className="navigation-link" to="/express">
                        <i className="fas fa-hat-wizard navigation-icon" style={{ marginRight: "10px" }}></i>
                        Express
                </NavLink>
                </li>
                <li className="nav-item navigation-item">
                    <NavLink exact className="navigation-link" to="/datasets">
                        <i className="fas fa-database navigation-icon" style={{ marginRight: "10px" }}></i>
                        Datasets
                </NavLink>
                </li>
                <li className="nav-item navigation-item">
                    <NavLink className="navigation-link" to="/predictions">
                        <i className="far fa-lightbulb navigation-icon" style={{ marginRight: "10px" }}></i>
                        Predictions
                </NavLink>
                </li>
                <li className="nav-item navigation-item">
                    <NavLink className="navigation-link" to="/account">
                        <i className="fas fa-user navigation-icon" style={{ marginRight: "10px" }}></i>
                        My Account
                </NavLink>
                </li>
                <li className="nav-item">
                    <a href="# " className="panda-button" onClick={(e) => { e.preventDefault(); this.props.userContext.logout() }}>Logout</a>
                </li>
            </ul>
        )
    }

    getLoggedOutContent() {
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item navigation-item">
                    <NavLink exact className="navigation-link" to="/express">
                        <i className="fas fa-hat-wizard navigation-icon" style={{ marginRight: "10px" }}></i>
                        Express
                </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="panda-button" to="/login">Login</NavLink>
                </li>
            </ul>
        )
    }

    render() {
        let content
        if (this.props.userContext.isLoggedIn) {
            content = this.getLoggedInContent()
        }
        else {
            content = this.getLoggedOutContent()
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light navigation-bar">
                    <NavLink exact className="navbar-brand" to="/"><i className="fas fa-coffee"></i> PonderPanda</NavLink>
                    <button className="navbar-toggler" style={{ border: "none" }} type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span> <span style={{ verticalAlign: "middle" }}>Menu</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div style={{ marginLeft: "auto" }}>
                            {content}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}