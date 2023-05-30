import React,{Fragment} from 'react';

import courseImg from '../asset/image/courseImg1.png'
import courseIm2 from '../asset/image/courseImg2.png'
import courseIm3 from '../asset/image/courseImg3.png'

import smallStar from '../asset/image/smallStar.png'
import bestBatch from '../asset/image/bestBatch.png'


import Fade from 'react-reveal/Fade';

const Course = () => {
    return (
        <Fragment>
            <section className='course-section'>
                <div className='row'>
                    <Fade left><h4>Course List</h4></Fade>
                    <Fade left><h2>Find your Perfect <br/> Course</h2></Fade>

                    <div className='course-grid'>
                        <Fade left>
                        <div className='col'>
                            <div className='courseImage'><img className='courseImg' src={courseImg} /><h5 className='courseImage-overlay'>Web Design</h5></div>
                            <div className='course-inner-grid'>
                                <div><h3>UI/UX Design</h3></div>
                                <div><img className='smallStar' src={smallStar} /></div>
                                <div><span className='amount'>$254.36</span></div>
                                <div><button className='course-btn'>Learn more</button></div>
                            </div>
                            <img className='bestBatch' src={bestBatch} /> <span className='bestSeller'>Best Seller</span>
                        </div>
                        </Fade>
                        <Fade top>
                        <div className='col'>
                            <div className='courseImage'><img className='courseImg' src={courseIm2} /><h5 className='courseImage-overlay'>Web Design</h5></div>
                            <div className='course-inner-grid'>
                                <div><h3>UI/UX Design</h3></div>
                                <div><img className='smallStar' src={smallStar} /></div>
                                <div><span className='amount'>$254.36</span></div>
                                <div><button className='course-btn'>Learn more</button></div>
                            </div>
                            <img className='bestBatch' src={bestBatch} /> <span className='bestSeller'>Best Seller</span>
                        </div>
                        </Fade>
                        <Fade right>
                        <div className='col'>
                            <div className='courseImage'><img className='courseImg' src={courseIm3} /><h5 className='courseImage-overlay'>Marketing</h5></div>
                            <div className='course-inner-grid'>
                                <div><h3>UI/UX Design</h3></div>
                                <div><img className='smallStar' src={smallStar} /></div>
                                <div><span className='amount'>$254.36</span></div>
                                <div><button className='course-btn'>Learn more</button></div>
                            </div>
                            <img className='bestBatch' src={bestBatch} /> <span className='bestSeller'>Best Seller</span>
                        </div>
                        </Fade>
                        <Fade left>
                        <div className='col'>
                            <div className='courseImage'><img className='courseImg' src={courseIm2} /><h5 className='courseImage-overlay'>Web Design</h5></div>
                            <div className='course-inner-grid'>
                                <div><h3>UI/UX Design</h3></div>
                                <div><img className='smallStar' src={smallStar} /></div>
                                <div><span className='amount'>$254.36</span></div>
                                <div><button className='course-btn'>Learn more</button></div>
                            </div>
                            <img className='bestBatch' src={bestBatch} /> <span className='bestSeller'>Best Seller</span>
                        </div>
                        </Fade>
                        <Fade bottom>
                        <div className='col'>
                            <div className='courseImage'><img className='courseImg' src={courseIm2} /><h5 className='courseImage-overlay'>Web Design</h5></div>
                            <div className='course-inner-grid'>
                                <div><h3>UI/UX Design</h3></div>
                                <div><img className='smallStar' src={smallStar} /></div>
                                <div><span className='amount'>$254.36</span></div>
                                <div><button className='course-btn'>Learn more</button></div>
                            </div>
                            <img className='bestBatch' src={bestBatch} /> <span className='bestSeller'>Best Seller</span>
                        </div>
                        </Fade>
                        <Fade right>
                        <div className='col'>
                            <div className='courseImage'><img className='courseImg' src={courseImg} /><h5 className='courseImage-overlay'>Web Design</h5></div>
                            <div className='course-inner-grid'>
                                <div><h3>UI/UX Design</h3></div>
                                <div><img className='smallStar' src={smallStar} /></div>
                                <div><span className='amount'>$254.36</span></div>
                                <div><button className='course-btn'>Learn more</button></div>
                            </div>
                            <img className='bestBatch' src={bestBatch} /> <span className='bestSeller'>Best Seller</span>
                        </div>
                        </Fade>
                        
                    </div>

                    
                </div>
            </section>
        </Fragment>
    );
};

export default Course;