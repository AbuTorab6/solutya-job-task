import React,{Fragment} from 'react';

import rightArrow from '../asset/image/rightArrow.png'
import testimonialImg from '../asset/image/testimonialImg.png'
import smallStar2 from '../asset/image/smallStar.png'


import Fade from 'react-reveal/Fade';

const Testimonial = () => {
    return (
        <Fragment>
            <section className='testimonial-section'>
                <div className='row'>
                    <div className='testimonial-grid'>
                        <div className='col'>
                            <Fade bottom><h4>Testimonial</h4></Fade>
                            <Fade bottom><h2>What They Say?</h2></Fade>
                            <Fade bottom><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu smod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repreh.<br/><br/> 
                            enderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p></Fade>

                            <div>
                                <input className='testimonial-input' type='text' placeholder='Write Your Assesment'/><span  className='rightArrow'>&rarr;</span>
                            </div>
                        </div>

                        <div className='col'>
                            <div className='testimonialImage'>
                                <img className='testimonialImg' src={testimonialImg} />
                                <div className='argu'>
                                    <p> Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo do consequat. Duis aute irure dolor in repreh </p>

                                    <h3 >Ruksana Akter</h3>
                                    <img className='smallStar2' src={smallStar2} />
                                </div>

                                <span  className='rightArrow2'>&rarr;</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Testimonial;