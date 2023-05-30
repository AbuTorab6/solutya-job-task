import React,{Fragment} from 'react';

import star from '../asset/image/star.png'
import rectangle from '../asset/image/rectangle.png'
import aboutImg from '../asset/image/about-img.png'

import Fade from 'react-reveal/Fade';


const About = () => {
    return (
        <Fragment>
            <section className='about-section'>
                <div className='row'>
                    <div className='about-grid'>
                        <div className='col left'>
                            <div className='about-image-bandle'>
                                <img className='star' src={star} />
                                <img className='rectangle' src={rectangle} />
                                <img className='aboutImg' src={aboutImg} />
                            </div>
                        </div>

                        <div className='col right'>
                            <Fade bottom><h4>About Us</h4></Fade>
                            <Fade bottom><h2>We are providing the best online digital courses.</h2></Fade>
                            <Fade bottom><p>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roo piece of classical Latin literature from 45 BC, making it over 2000 years old. Ri chard McClintock, a Latin professor at Hampden-Sydney College in Virginia, l ooked up one of the more obscure Latin words, consectetur, from a Lorem Ips um passage, and going through the cites of the word in classical literature, di scovered the undoubtable source. <br/><br/>
                            .Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonoru et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on.
                            </p></Fade>
                            <Fade bottom><button className='about-btn'>Learn more</button></Fade>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default About;