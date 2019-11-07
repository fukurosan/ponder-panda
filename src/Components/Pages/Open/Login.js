import React from 'react'
import { UserContext } from "../../../Contexts/UserContext"

export default class Login extends React.Component {

    render() {
        return (
            <UserContext.Consumer>
                {(UserContext) => (
                    <LoginInner userContext={UserContext} {...this.props} />
                )}
            </UserContext.Consumer>
        )
    }
}

class LoginInner extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            mode: "login"
        }
    }

    handleChange(event) {
        this.setState({ [event.target.placeholder.toLowerCase()]: event.target.value });
    }

    setMode(mode) {
        this.setState({ mode: mode, password: "" })
        this.props.userContext.removeLoginError()
    }

    signup() {
        if (this.state.email !== "" && this.state.password !== "") {
            this.props.userContext.signup(this.state.email, this.state.password)
            this.setState({
                email: "",
                password: ""
            })
        }
    }

    login() {
        if (this.state.email !== "" && this.state.password !== "") {
            this.props.userContext.login(this.state.email, this.state.password)
            this.setState({
                email: "",
                password: ""
            })
        }
    }

    forgot() {
        if (this.state.email !== "") {
            this.props.userContext.forgotPassword(this.state.email)
            this.setState({
                email: "",
                password: ""
            })
        }
    }

    getError() {
        if (this.props.userContext.loginError !== null) {
            return <div className="login-error">{this.props.userContext.loginError}</div>
        }
        return null
    }

    getContent() {

        const loginError = this.getError()

        switch (this.state.mode) {
            case "login":
                return (
                    <div className="login-form-container">
                        <h1>Login</h1>
                        <input type="text" className="panda-form" placeholder="Email" value={this.state.email} onChange={(e) => { this.handleChange(e) }} style={{ height: "50px" }}></input>
                        <input type="password" className="panda-form" placeholder="Password" value={this.state.password} onChange={(e) => { this.handleChange(e) }} style={{ height: "50px" }}></input>
                        <button className="panda-form panda-button" style={{ height: "50px" }} onClick={() => { this.login() }} disabled={this.props.userContext.isLoginLoading}>
                            Login
                        </button>
                        {loginError}
                        <a href="# " onClick={(e) => { e.preventDefault(); this.setMode("forgot") }}>Forgot password</a>
                        <br />
                        <a href="# " onClick={(e) => { e.preventDefault(); this.setMode("signup") }}>Create New Account</a>
                    </div>
                )
            case "signup":
                return (
                    <div className="login-form-container">
                        <h1>Sign up</h1>
                        <input type="text" className="panda-form" placeholder="Email" value={this.state.email} onChange={(e) => { this.handleChange(e) }} style={{ height: "50px" }}></input>
                        <input type="password" className="panda-form" placeholder="Password" value={this.state.password} onChange={(e) => { this.handleChange(e) }} style={{ height: "50px" }}></input>
                        <button className="panda-form panda-button" style={{ height: "50px" }} onClick={() => { this.signup() }}>
                            Register
                        </button>
                        {loginError}
                        <a href="# " onClick={(e) => { e.preventDefault(); this.setMode("login") }}>Back</a>
                    </div>
                )
            case "forgot":
                return (
                    <div className="login-form-container">
                        <h1>Password Reset</h1>
                        <input type="text" className="panda-form" placeholder="Email" value={this.state.email} onChange={(e) => { this.handleChange(e) }} style={{ height: "50px" }}></input>
                        <button className="panda-form panda-button" style={{ height: "50px" }} onClick={() => { this.forgot() }}>
                            Reset
                        </button>
                        {loginError}
                        <a href="# " onClick={(e) => { e.preventDefault(); this.setMode("login") }}>Back</a>
                    </div>
                )
            default:
            return null
        }
    }

    render() {

        const content = this.getContent()

        return <div className="row m-0">
            <div className="col-lg-4 d-none d-lg-table login-page-left-column">
                <div className="login-left-column-inner">
                    <p><i className="fas fa-coffee" style={{ fontSize: "34px" }}></i></p>
                    <h2>Fun fact</h2>
                    <p>An adult panda weighs more than 45kg (100 pounds), and can grow to be 1.5 meters (5 feet) tall!</p>
                </div>
            </div>
            <div className="col-lg-8 col-12 login-page-right-column">
                <div className="login-form">
                    {content}
                </div>
            </div>
        </div>
    }
}