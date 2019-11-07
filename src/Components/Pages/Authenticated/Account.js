import React from "react";
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'
import { UserContext } from '../../../Contexts/UserContext'

export default class Account extends React.Component {
    render() {
        return (
            <div>
                <div className="non-footer-content">
                    <Navbar />
                    <div className="container">
                        <h1>My Account</h1>
                        <UserContext.Consumer>
                            {(UserContext) => (
                                <React.Fragment>
                                </React.Fragment>
                            )}
                        </UserContext.Consumer>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
