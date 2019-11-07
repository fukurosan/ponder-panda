import React, { Component } from 'react'

export const UserContext = React.createContext({})

export class UserContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            loginError: null,
            isLoginLoading: false,
            login: (email, password) => { this.login(email, password) },
            logout: () => { this.logout() },
            signup: (email, password) => { this.signup(email, password) },
            forgotPassword: (email) => { this.forgotPassword(email) },
        }
    }

    login = (email, password) => {
        this.setState({
            isLoginLoading: false,
            isLoggedIn: true,
            loginError: null
        })
    }

    logout = () => {
        this.setState({
            isLoginLoading: false,
            isLoggedIn: false,
            loginError: null
        })
    }

    signup = (email, password) => {

    }

    forgotPassword = (email) => {

    }

    render() {
        return (
            <UserContext.Provider value={this.state} >
                {this.props.children}
            </UserContext.Provider >
        )
    }
}
