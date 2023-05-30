import React,{Fragment} from 'react';

import footerLogo from '../asset/image/footerLogo.png'
import apple from '../asset/image/apple.png'
import googleFooter from '../asset/image/googleFooter.png'
import linkedin from '../asset/image/linkedin.png'
import twitter from '../asset/image/twitter.png'
import facebook from '../asset/image/facebook.png'

const Footer = () => {
    return (
        <Fragment>
            <section className='footer-section'>
                <div className='row'>
                    <div className='footer-grid'>
                        <div className='col'>
                            <div><img className='footerLogo' src={footerLogo} /></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do.</p>
                            <div><img className='apple' src={apple} /></div>
                            <div><img className='googleFooter' src={googleFooter} /></div>
                            <h4>Follow us</h4>
                            <img className='linkedin' src={linkedin} />
                            <img className='twitter' src={twitter} />
                            <img className='facebook' src={facebook} />
                        </div>
                        <div>
                            <h3>About Us</h3>
                            <p>Our Company</p>
                            <p>Career</p>
                            <p>Investor Relations</p>
                            <p>Social Impact</p>
                        </div>
                        <div>
                            <h3>Resources</h3>
                            <p>Contact</p>
                            <p>Give Feedback</p>
                            <p>Hello@example.com</p>
                        </div>
                        <div>
                            <div>
                                <input className='footer-input' type='text' placeholder='Email Address'/> <button className='footerBtn'>Startted</button>
                            </div>
                            <p>Email US</p>
                            <p>RK@Oama.io</p>
                            <p>Bolomu All Rights Reserved, 2021</p>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Footer;