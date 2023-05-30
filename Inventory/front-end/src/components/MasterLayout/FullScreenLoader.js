import React,{Fragment} from 'react';

import {useSelector} from 'react-redux'

const FullScreenLoader = () => 
{

    var visibility =  useSelector((state)=>state.loaderState.visibility)
    
    return (
        <Fragment>
            <div className={'full-screen '+visibility}>
                <div className='line'>
                    <div className='core'></div>
                </div>
            </div>
        </Fragment>
    );
};

export default FullScreenLoader;