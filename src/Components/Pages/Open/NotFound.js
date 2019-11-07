import React from "react";

import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'

export default class NotFound extends React.Component {
    render() {
        return (
            <div>
                <div className="non-footer-content">
                    <Navbar />
                    <div className="container">
                        <div style={{ textAlign: "center" }}>
                            <h2>Oops! The page you are looking for could not be found!</h2>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
