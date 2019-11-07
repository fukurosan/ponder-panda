import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="row m-0 mr-0">
                    <div className="footer-menu-column footer-ul col-lg-12 col-xl-2">
                        <p>
                            <i className="fas fa-coffee"></i> PonderPanda
                        </p>
                        <div className="small">© 2019 PonderPanda</div>
                    </div>
                    <div className="col-xl-4"></div>
                    <div className="footer-menu-column col-xl-2 col-lg-4">
                        <p>
                            <b>Resources</b>
                        </p>
                        <ul className="footer-ul">
                            <li className="footer-li">
                                <div className="small">What is PonderPanda?</div>
                            </li>
                            <li className="footer-li">
                                <div className="small">Features</div>
                            </li>
                            <li className="footer-li">
                                <div className="small">Help</div>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-menu-column col-xl-2 col-lg-4">
                        <p>
                            <b>Connect</b>
                        </p>
                        <ul className="footer-ul">
                            <li className="footer-li">
                                <div className="small">Contact Us</div>
                            </li>
                            <li className="footer-li">
                                <div className="small">Social Media</div>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-menu-column col-xl-2 col-lg-4">
                        <p>
                            <b>Company</b>
                        </p>
                        <ul className="footer-ul">
                            <li className="footer-li">
                                <div className="small">About Us</div>
                            </li>
                            <li className="footer-li">
                                <div className="small">Privacy Policy</div>
                            </li>
                            <li className="footer-li">
                                <div className="small">Terms of Service</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
