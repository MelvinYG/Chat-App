import { useState } from 'react';
import './options.css';

const Options = (prop) => {
    const [arrowUp,setArrowUp] = useState(false);

    function arrowHandler() {
        setArrowUp(prev => !prev);
    }
    return (
        <>
            <div className="options">
                <div className="option-item" onClick={arrowHandler}>
                    <div className="option-details">
                        <img src={prop.icon} alt="" />
                        <p>{prop.value}</p>
                    </div>
                    <img src={arrowUp ? "./arrrow-up.png" : "./arrow-down.png"} alt=""/>
                </div>
            </div>
        </>
    )
};

export default Options;