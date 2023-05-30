import React,{Fragment} from 'react';


import team1 from '../asset/image/team1.png'
import team2 from '../asset/image/team2.png'
import team3 from '../asset/image/team3.png'
import team4 from '../asset/image/team4.png'

import Slide   from 'react-reveal/Rotate';

const Team = () => {
    return (
        <Fragment>
            <section className='team-section'>
                <div className='row'>
                <h4>Team Member</h4>
                <h2>Popular Professional  <br/> Teachers</h2>
                <div className='team-grid'>
                    <Slide    bottom>
                    <div className='col'>
                        <div className='teamImage'><img className='teamImg' src={team1} /></div>
                        <div className='team-overlay'>
                            <h3 className='member-name'>Pushpa Kanon</h3>
                            <p className='member-des'>CEO, derhab</p>
                        </div>
                    </div>
                    </Slide  >
                    <Slide    bottom>
                    <div className='col'>
                        <div className='teamImage'><img className='teamImg' src={team2} /></div>
                        <div className='team-overlay'>
                            <h3 className='member-name'>Pushpa Kanon</h3>
                            <p className='member-des'>CEO, derhab</p>
                        </div>
                    </div>
                    </Slide  >
                    <Slide    bottom>
                    <div className='col'>
                        <div className='teamImage'><img className='teamImg' src={team3} /></div>
                        <div className='team-overlay'>
                            <h3 className='member-name'>Pushpa Kanon</h3>
                            <p className='member-des'>CEO, derhab</p>
                        </div>
                    </div>
                    </Slide  >
                    <Slide    bottom>
                    <div className='col'>
                        <div className='teamImage'><img className='teamImg' src={team4} /></div>
                        <div className='team-overlay'>
                            <h3 className='member-name'>Pushpa Kanon</h3>
                            <p className='member-des'>CEO, derhab</p>
                        </div>
                    </div>
                    </Slide  >
                </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Team;