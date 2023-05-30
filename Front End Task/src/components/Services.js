import React,{Fragment} from 'react';

import serviceImg1 from '../asset/image/serviceImg1.png'
import serviceImg2 from '../asset/image/serviceImg2.png'
import serviceImg3 from '../asset/image/serviceImg3.png'
import serviceImg4 from '../asset/image/serviceImg4.png'
import serviceImg5 from '../asset/image/serviceImg5.png'
import serviceImg6 from '../asset/image/serviceImg6.png'
import serviceImg7 from '../asset/image/serviceImg7.png'
import serviceImg8 from '../asset/image/serviceImg8.png'


import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';


const Services = () => {
    return (
        <Fragment>
            <section className='services-section'>
                <div className='row'>
                <Fade left><h4>Service</h4></Fade>
                <Fade left><h2>Top <br/> Categories</h2></Fade>

                    <div className='services-grid'>
                        <Flip left>
                        <div className='col'>
                            <div className='serviceImage'><img className='serviceImg' src={serviceImg1} /></div>
                            <h3>Development</h3>
                        </div>
                        </Flip>
                        <Flip left>
                        <div className='col'>
                            <div className='serviceImage'><img className='serviceImg' src={serviceImg2} /></div>
                            <h3>Business</h3>
                        </div>
                        </Flip>
                        <Flip left>
                        <div className='col bg-primary'>
                            <div className='serviceImage'><img className='serviceImg' src={serviceImg3} /></div>
                            <h3 className='text-white'>IT and Software</h3>
                        </div>
                        </Flip>
                        <Flip left>
                        <div className='col'>
                            <div className='serviceImage'><img className='serviceImg' src={serviceImg4} /></div>
                            <h3>UI Design</h3>
                        </div>
                        </Flip>
                        <Flip left>
                        <div className='col'>
                            <div className='serviceImage'><img className='serviceImg' src={serviceImg5} /></div>
                            <h3>UX Design</h3>
                        </div>
                        </Flip>
                        <Flip left>
                        <div className='col'>
                            <div className='serviceImage'><img className='serviceImg' src={serviceImg6} /></div>
                            <h3>Marketing</h3>
                        </div>
                        </Flip>
                        <Flip left>
                        <div className='col'>
                            <div className='serviceImage'><img className='serviceImg' src={serviceImg7} /></div>
                            <h3>Photography</h3>
                        </div>
                        </Flip>
                        <Flip left>
                        <div className='col'>
                            <div className='serviceImage'><img className='serviceImg' src={serviceImg8} /></div>
                            <h3>Graphics Design</h3>
                        </div>
                        </Flip>

                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Services;