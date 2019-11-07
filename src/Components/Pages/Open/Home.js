import React from "react";
import Navbar from '../../Layout/Navbar'
import Footer from '../../Layout/Footer'
import panda from '../../../Assets/Img/panda.jpg'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="non-footer-content">
                    <Navbar />
                    <div className="container">
                        <div style={{ textAlign: "center" }}>
                            <h1 style={{ fontSize: "50px", fontWeight: "600" }}>Welcome to PonderPanda</h1>
                            <h2>The simplest ML tool on the web</h2>
                            <br /><br />
                            <img src={panda} style={{ height: "280px" }} alt="Panda Time!" />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
