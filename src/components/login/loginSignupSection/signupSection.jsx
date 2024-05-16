import { useState } from 'react';
import './loginSignupSection.css'

const SignupSection = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);

    function passwordHandler() {
        setVisiblePassword(prev => !prev);
    }
    return (
        <>
            <div className="login-section">
                <div className="login-container">
                    <h3>Create an User</h3>
                    <form action='' className="input-container">
                        <input type="text" placeholder='Username' className='other-input'/>
                        <input type="email" placeholder='Email' className='other-input'/>
                        <div className="password-box">
                            <input type={visiblePassword ? "text" : "password"} placeholder='Password' />
                            <img src={visiblePassword ? "./hide-eye.png" : "./eye.png"} alt="" onClick={passwordHandler} />
                        </div>
                        <button className='primary'>Sign-Up</button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default SignupSection;