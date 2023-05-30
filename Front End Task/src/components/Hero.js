import React,{Fragment} from 'react';

import playBtn from '../asset/image/playBtn.png'
import heroimg from '../asset/image/hero-img.png'

import polygon from '../asset/image/Polygon.png'
import dotedBottom from '../asset/image/dotedBottom.png'
import dotedTop from '../asset/image/dotedTop.png'
import mouse from '../asset/image/mouse.png'
import mouse2 from '../asset/image/mouse2.png'

import batch from '../asset/image/batch.png'
import loop from '../asset/image/loop.png'

import google from '../asset/image/google.png'
import ms from '../asset/image/ms.webp'
import dribble from '../asset/image/dribble.png' 
import lattice from '../asset/image/lattice.png'



import Fade from 'react-reveal/Fade';

const Hero = () => {
    return (
        <Fragment>
            <section className='hero-section'>
            <img className='loop' src={loop} />
                <div className='row'>
                    <div className='hero-grid'>
                        <div className='col left'>
                            <div className='text-box'>
                                <Fade bottom><h1>For Every Student Every Classroom.<br/><span className='blue'>Real Results.</span></h1></Fade>
                                <Fade bottom><p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a completeLorem ipsum dolor sit amet, consectetur adipi scing elit, sed do eiusm</p></Fade>
                                <Fade left><button className='hero-btn'>Get Started</button></Fade>
                                <Fade left><img className='playBtn' src={playBtn} /></Fade>
                                <Fade right><span className='watch'>Watch Video</span></Fade>
                            </div>
                        </div>

                        <div className='col right'>
                            <div className='heroImage'>
                                <img className='polygon' src={polygon} />
                                <img className='dotedTop' src={dotedTop} />
                                <img className='mouse' src={mouse} />
                                <img className='heroImg' src={heroimg} />
                                <img className='dotedBottom' src={dotedBottom} />
                                <img className='mouse2' src={mouse2} />


                                <div className='hero-card'>
                                    <div className='hero-card-top-grid'>
                                        <div >
                                        <div className='batchImage'><img className='batchImg' src={batch} /></div>
                                        </div>
                                        <div >
                                            <p>Counting</p>
                                            <h4>100,585+</h4>
                                        </div>
                                    </div>
                                    <div className='hero-card-bottom-grid'>
                                        <p>Graduations</p>
                                        <p>5.5 Year</p>
                                    </div>
                                </div>
                         </div>
                        </div>
                    </div>

                    <div className='hero-bottom-grid'>
                        <div>
                            <Fade left><div className='hero-bottom-grid-image'><img className='hero-bottom-grid-img' src={google} /></div></Fade>
                        </div>
                        <div>
                         <Fade bottom><div className='hero-bottom-grid-image mt-3'><img className='hero-bottom-grid-img' src={ms} /></div></Fade>
                        </div>
                        <div>
                        <Fade top><div className='hero-bottom-grid-image mt-4'><img className='hero-bottom-grid-img' src={dribble} /></div></Fade>
                        </div>
                        <div>
                        <Fade right><div className='hero-bottom-grid-image mt-3'><img className='hero-bottom-grid-img' src={lattice} /></div></Fade>
                        </div>
                    </div>

                </div>
            </section>
        </Fragment>
    );
};

export default Hero;